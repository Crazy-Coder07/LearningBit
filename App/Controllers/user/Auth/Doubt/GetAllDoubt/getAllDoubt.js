"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");


async function GetAllDoubt(req, res, next) {
  try {
    
    const sql = `
         SELECT 
             ask_doubt.id AS doubt_id,
             ask_doubt.title AS doubt_title,
             ask_doubt.Detail_Problems AS Detail_Problems,
             ask_doubt.what_try_what_get AS what_try_what_get,
             ask_doubt.got_error_image,
             ask_doubt.postdate,
             ask_doubt.view_count,
             COUNT(DISTINCT CASE WHEN doubt_likes.like_status = '0' THEN doubt_likes.id END) AS like_count,
             COUNT(DISTINCT CASE WHEN doubt_likes.like_status = '1' THEN doubt_likes.id END) AS dislike_count,
             COUNT(reply_doubt.doubt_id) AS total_answer
        FROM ask_doubt 
        LEFT JOIN doubt_likes ON ask_doubt.id = doubt_likes.doubt_id
        LEFT JOIN reply_doubt ON ask_doubt.id=reply_doubt.doubt_id
        GROUP BY ask_doubt.id;
    `;

    const values = [];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Retrieve all the list of the blog`;

        return returnServerRes(res, 200, true,successMsg,results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  GetAllDoubt
};
