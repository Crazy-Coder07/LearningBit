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
          return returnServerRes(res, 404, false, "Blog ID does not exist");
        }
      }
    });
  } catch (error) {
    console.error("Error checking if blog id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function GetDoubtById(req, res, next) {
  try {
    
    const doubt_id=req.headers["x-doubt-id"];
   
    const sql = `
    SELECT 
         ask_doubt.id AS asd_doubt_id,
         ask_doubt.student_id AS student_id,
         ask_doubt.title AS title,
         ask_doubt.Detail_Problems AS detail_problems,
         ask_doubt.what_try_what_get AS what_try_what_get,
         ask_doubt.got_error_image ,
         ask_doubt.view_count,
         ask_doubt.postdate,
         userregister.id AS student_id,
         userregister.name AS student_name
    FROM ask_doubt 
    LEFT JOIN userregister ON ask_doubt.student_id=userregister.id
    WHERE ask_doubt.id=?
    `;
    const values = [doubt_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Retrieve the blog for blog_id ==>${doubt_id}`;

        return returnServerRes(res, 200, true,successMsg,results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  IsDoubtIdExists,
  GetDoubtById
};
