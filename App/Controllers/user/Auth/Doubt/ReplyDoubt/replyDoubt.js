"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");

async function sanitizeBody(req, res, next) {
  try {
    const {
      answer
    } = req.body;

    req.sanitizeBody_Data = {
      answer: sanitizeString(answer)
    };

    return next();
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

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

async function ReplyDoubttByStudent(req, res, next) {
  try {
    const {answer} = req.sanitizeBody_Data;
    const doubt_id=req.headers["x-doubt-id"];

    const user_id=req.user_id;
   
    const sql = `
      INSERT INTO reply_doubt (answer,doubt_id,student_id)
      VALUES (?, ?, ?);
    `;

    const values = [answer,doubt_id,user_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          return next(); 
        } else {
          const errorMsg = "Something Went Wrong in Reply the Doubt";
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
    const successMsg = "Reply the Doubt successfully";
    
    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  IsDoubtIdExists,
  ReplyDoubttByStudent,
  sendSuccessMsg,
};
