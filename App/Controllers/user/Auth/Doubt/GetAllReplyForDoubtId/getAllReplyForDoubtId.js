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
        console.error("Error checking if blog id exists:", error);
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
    console.error("Error checking if blog id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function GetAllReplyForDoubtId(req, res, next) {
  try {

    const doubt_id = req.headers["x-doubt-id"];

    const sql = `
          SELECT 
              reply_doubt.id AS reply_id,
              reply_doubt.doubt_id AS doubt_id,
              reply_doubt.student_id AS student_id,
              reply_doubt.answer AS sanswer,
              reply_doubt.post_date AS post_date,
              userregister.id AS student_id,
              userregister.name AS student_name,
              userregister.photo AS student_photo,
              COUNT(CASE WHEN reply_doubt_likes.like_status = '0' THEN 1 END) AS like_count,
              COUNT(CASE WHEN reply_doubt_likes.like_status = '1' THEN 1 END) AS dislike_count
          FROM 
              reply_doubt
          LEFT JOIN 
              userregister ON reply_doubt.student_id = userregister.id
          LEFT JOIN 
              reply_doubt_likes ON reply_doubt.id = reply_doubt_likes.reply_doubt_id
          WHERE 
              doubt_id = ?
          GROUP BY 
              reply_doubt.id
          ORDER BY 
              post_date ASC;
    `;

    const values = [doubt_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Retrieve all the list of the blog`;

        return returnServerRes(res, 200, true, successMsg, results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  IsDoubtIdExists,
  GetAllReplyForDoubtId
};
