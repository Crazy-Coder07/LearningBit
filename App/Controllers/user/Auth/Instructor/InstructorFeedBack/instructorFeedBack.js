"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");

async function sanitizeBody(req, res, next) {
  try {
    const {
      subject,
      message
    } = req.body;

    req.sanitizeBody_Data = {
      subject: sanitizeString(subject),
      message: sanitizeString(message)
    };

    return next();
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


async function saveStudentFeedBack(req, res, next) {
  try {
    const {subject,message} = req.sanitizeBody_Data;

    const photo = req.file ? req.file.filename : null;
    
    const instructor_id=req.instructor_id;
   
    if (!photo) {
      return returnServerRes(res, 400, false, "Error in uploading image");
    }
   
    const sql = `
      INSERT INTO instructor_feedback (subject, message, image,instructor_id)
      VALUES (?, ?, ?,?);
    `;

    const values = [subject,message,photo,instructor_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          return next(); 
        } else {
          const errorMsg = "Something Went Wrong in submitting the FeedBack Please try again later";
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
    const successMsg = "Feedback sent successfully";
    
    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  saveStudentFeedBack,
  sendSuccessMsg,
};
