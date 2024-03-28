"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");

async function IsDoubtIdExists(req, res, next) {
  try {
    const doubt_id = req.headers["x-doubt-id"];
   
    const sql = `
       SELECT id
       FROM ask_doubt
       WHERE id = ?
    `;

    const values = [doubt_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if Doubt id exists:", error);
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
    console.error("Error checking if Doubt id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function AlreadyDisLikedDoubt(req, res, next) {
  try {
    const doubt_id = req.headers["x-doubt-id"];
    const user_id=req.user_id;
   
    const sql = `
       SELECT id
       FROM doubt_likes
       WHERE doubt_id = ? AND student_id = ? AND like_status='1'
    `;

    const values = [doubt_id,user_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if Doubt id exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          return returnServerRes(res, 404, false, "You Already DisLiked this Doubt");
        } else {
          return next();
        }
      }
    });
  } catch (error) {
    console.error("Error checking if Doubt id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function PostLikes(req, res, next) {
  try {
    const doubt_id = req.headers["x-doubt-id"];
    const user_id = req.user_id;

    const selectSql = `
       SELECT id, like_status
       FROM doubt_likes
       WHERE doubt_id = ? AND student_id = ?
    `;

    const selectValues = [doubt_id, user_id];

    connection.query(selectSql, selectValues, (error, results) => {
      if (error) {
        console.error("Error checking if like exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          const likeStatus = results[0].like_status;
          if (likeStatus === '0') {
            const updateSql = `
              UPDATE doubt_likes
              SET like_status = '1'
              WHERE id = ?
            `;
            const updateValues = [results[0].id];
            connection.query(updateSql, updateValues, (error, updateResults) => {
              if (error) {
                console.error("Error updating like status:", error);
                return returnServerRes(res, 500, false, "Internal server error");
              } else {
                const successMsg = `Again Disliked the Doubt for doubt_id ==>${doubt_id}`;
                return returnServerRes(res, 200, true, successMsg, updateResults);
              }
            });
          } else {
            return returnServerRes(res, 404, false, "You have already disliked this Doubt");
          }
        } else {
          const insertSql = `
            INSERT INTO doubt_likes(doubt_id, student_id, like_status)
            VALUES(?, ?, '1')
          `;
          const insertValues = [doubt_id, user_id];
          connection.query(insertSql, insertValues, (error, insertResults) => {
            if (error) {
              console.error("Error inserting like data:", error);
              return returnServerRes(res, 500, false, "Internal server error");
            } else {
              const successMsg = `DisLike the Doubt for doubt_id ==>${doubt_id}`;
              return returnServerRes(res, 200, true, successMsg, insertResults);
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

module.exports = {
  IsDoubtIdExists,
  AlreadyDisLikedDoubt,
  PostLikes
};
