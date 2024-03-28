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
          SELECT *
          FROM reply_doubt
          WHERE doubt_id = ?
          ORDER BY post_date ASC;
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
