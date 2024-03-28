"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");

async function sanitizeBody(req, res, next) {
  try {
    const {
      title,
      Detail_Problems,
      what_try_what_get
    } = req.body;

    req.sanitizeBody_Data = {
      title: sanitizeString(title),
      Detail_Problems: sanitizeString(Detail_Problems),
      what_try_what_get: sanitizeString(what_try_what_get)
    };

    return next();
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


async function PostDoubtByStudent(req, res, next) {
  try {
    const {title,Detail_Problems,what_try_what_get} = req.sanitizeBody_Data;

    const photo = req.file ? req.file.filename : null;
    
    const user_id=req.user_id;
   
    if (!photo) {
      return returnServerRes(res, 400, false, "Error in uploading image");
    }
   
    const sql = `
      INSERT INTO ask_doubt (title, Detail_Problems, what_try_what_get, got_error_image,student_id)
      VALUES (?, ?, ?, ?, ?);
    `;

    const values = [title,Detail_Problems,what_try_what_get,photo,user_id];


    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          return next(); 
        } else {
          const errorMsg = "Something Went Wrong in Creating the Blogs Please try again later";
          return returnServerRes(res, 500, false, errorMsg);
        }
      }
    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function sendSuccessMsg(req, res, next) {
  try {
    const successMsg = "Doubt Post successfully";
    
    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  PostDoubtByStudent,
  sendSuccessMsg,
};
