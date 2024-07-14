"use strict";

const connection = require("../../../../../database/db");
const { returnServerRes } = require("../../../../../Helper");

async function IsReplyDoubtIdExists(req, res, next) {
  try {
    const replydoubt_id = req.headers["x-reply-doubt-id"];
   
    const sql = `
       SELECT id
       FROM reply_doubt
       WHERE id = ?
    `;

    const values = [replydoubt_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if doubt id exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          return next();
        } else {
          return returnServerRes(res, 404, false, "Doubt ID does not exist");
        }
      }
    });
  } catch (error) {
    console.error("Error checking if replydoubt_id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function AlreadyLikedReplyDoubt(req, res, next) {
  try {
    const replydoubt_id = req.headers["x-reply-doubt-id"];
    const user_id=req.user_id;
   
    const sql = `
       SELECT id
       FROM reply_doubt_likes
       WHERE reply_doubt_id = ? AND student_id = ? AND like_status='0'
    `;

    const values = [replydoubt_id,user_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if replydoubt id exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          return returnServerRes(res, 409, false, "You Already Liked this Reply");
        } else {
          return next();
        }
      }
    });
  } catch (error) {
    console.error("Error checking if reply_doubt id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function PostLikes(req, res, next) {
  try {
    const replydoubt_id = req.headers["x-reply-doubt-id"];
    const user_id = req.user_id;

    const selectSql = `
       SELECT id, like_status
       FROM reply_doubt_likes
       WHERE reply_doubt_id = ? AND student_id = ?
    `;

    const selectValues = [replydoubt_id, user_id];

    connection.query(selectSql, selectValues, (error, results) => {
      if (error) {
        console.error("Error checking if like exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          const likeStatus = results[0].like_status;
          if (likeStatus === '1') {
            const updateSql = `
              UPDATE reply_doubt_likes
              SET like_status = '0'
              WHERE id = ?
            `;
            const updateValues = [results[0].id];
            connection.query(updateSql, updateValues, (error, updateResults) => {
              if (error) {
                console.error("Error updating like status:", error);
                return returnServerRes(res, 500, false, "Internal server error");
              } else {
                // const successMsg = `Again liked the blog for doubt_id ==>${doubt_id}`;
                // return returnServerRes(res, 200, true, successMsg, updateResults);
                return next();
              }
            });
          } else {
            return returnServerRes(res, 409, false, "You have already disliked this reply");
          }
        } else {
          const insertSql = `
            INSERT INTO reply_doubt_likes(reply_doubt_id, student_id, like_status)
            VALUES(?, ?, '0')
          `;
          const insertValues = [replydoubt_id, user_id];
          connection.query(insertSql, insertValues, (error, insertResults) => {
            if (error) {
              console.error("Error inserting like data:", error);
              return returnServerRes(res, 500, false, "Internal server error");
            } else {
              // const successMsg = `Like the blog for doubt_id ==>${doubt_id}`;
              // return returnServerRes(res, 200, true, successMsg, insertResults);
              return next();
            }
          });
        }
      }
    });
  } catch (error) {
    console.error("Error handling like operation:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function TotalLikedByReplyDoubt(req, res, next) {
  try {
    const replydoubt_id = req.headers["x-reply-doubt-id"];

    const sql = `
       SELECT COUNT(DISTINCT id) AS totalLikes
       FROM reply_doubt_likes
       WHERE reply_doubt_id =? AND like_status = '0';
    `;

    const values = [replydoubt_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error retrieving total likes:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          const totalLikes = results[0].totalLikes;
          return returnServerRes(res, 200, true, "Total likes retrieved successfully", { totalLikes });
        } else {
          return returnServerRes(res, 404, false, "replydoubt not found or no likes");
        }
      }
    });
  } catch (error) {
    console.error("Error retrieving total likes:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  IsReplyDoubtIdExists,
  AlreadyLikedReplyDoubt,
  PostLikes,
  TotalLikedByReplyDoubt
};
