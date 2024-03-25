"use strict";

const connection = require("../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../Helper");
const {
    CreateUserRegisterTable
} = require("../../../Model/user/Registration/userRegisteTable");
const bcrypt = require('bcrypt');
const fs = require("fs");

async function sanitizeBody(req, res, next){
  try {
    const {
      email,
      childhood_name,
      new_password
    } = req.body;

    req.sanitizeBody_Data = {
      email: sanitizeString(email),
      childhood_name:sanitizeString(childhood_name),
      new_password: sanitizeString(new_password)
    };
    console.log(req.sanitizeBody_Data);

    return next();
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function isUserPresentInTable(req, res, next) {
    try {
      const {email } = req.sanitizeBody_Data;
      const sql =
        "SELECT email FROM userregister WHERE email = ?";
    
  
      await connection.query(sql, [email], (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return;
        }
  
        //  if user is registered
        if (results.length > 0) {
            return next();
        }
        //  if user is not registered 
      const errorMsg ="user is not registered please do registration first";
       return returnServerRes(res, 400, false, errorMsg);
      });
    } catch (error) {
      console.log(error);
      return returnServerRes(res, 500, false, "Internal server error");
    }
  }

  async function IsChildhoodNameMatchOrNot(req, res, next) {
    try {
        const { email, childhood_name } = req.sanitizeBody_Data;

        const sql = "SELECT childhood_name FROM userregister WHERE email = ? AND childhood_name = ?";

        connection.query(sql, [email, childhood_name], async (error, results) => {
            if (error) {
                console.error("Error retrieving user data:", error);
                return returnServerRes(res, 500, false, "Internal server error");
            } else {
                if (results.length > 0) {
                    return next();
                } else {
                    return returnServerRes(res, 404, false, "The childhood name provided does not match the one associated with this email");
                }
            }
        });
    } catch (error) {
        console.error("Error checking childhood name:", error);
        return returnServerRes(res, 500, false, "Internal server error");
    }
}

async function saveNewPassword(req, res, next) {
  try {
    const { email,new_password,childhood_name} = req.sanitizeBody_Data;

    // Hash the password before saving it into the database
    const hashedPassword = await bcrypt.hash(new_password, 10);

    const sql = `
       UPDATE userregister 
       SET password=?
       WHERE email='${email}' AND childhood_name ='${childhood_name}';
    `;


    connection.query(sql,[hashedPassword], (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          return next(); 
        } else {
          const errorMsg = "getting the error when saving into the database";
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
    const successMsg = "Forgot Password Successfully";
    
    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  isUserPresentInTable,
  IsChildhoodNameMatchOrNot,
  saveNewPassword,
  sendSuccessMsg,
};
