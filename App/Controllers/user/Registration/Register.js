"use strict";

const connection = require("../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../Helper");
const {
    CreateUserRegisterTable
} = require("../../../Model/user/Registration/userRegisteTable");
const bcrypt = require('bcrypt');
const fs = require("fs");

async function sanitizeBody(req, res, next) {
  try {
    const {
      name,
      phone,
      email,
      address,
      password,
      childhood_name
    } = req.body;

    req.sanitizeBody_Data = {
      name: sanitizeString(name),
      phone: sanitizeString(phone),
      email: sanitizeString(email),
      address: sanitizeString(address),
      password: sanitizeString(password),
      childhood_name:sanitizeString(childhood_name)
    };

    return next();
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function createUserRegisterTableIfItNotCreated(req, res, next) {
  try {
    connection.query(CreateUserRegisterTable, (queryErr, results) => {
      if (queryErr) {
        console.error("Error userregister table:", queryErr);
        console.log(error); 
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        console.log("userRegister table created successfully");
        return next();
      }
    });
  } catch (error) {
    console.log(error); 
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

      //  if user is already registered
      if (results.length > 0) {
        const errorMsg =
        "user is already registered please go login";
      return returnServerRes(res, 400, false, errorMsg);
      }
    //   if user is not registered 
      return next();
      
    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function saveFormInUserRegisterTable(req, res, next) {
  try {
    const { name, phone, email, address, password,childhood_name} = req.sanitizeBody_Data;

    const photo = req.file ? req.file.filename : null;
   
    if (!photo) {
      return returnServerRes(res, 400, false, "Error in uploading image");
    }
   
    // Hash the password before saving it into the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO userregister (name, phone, email, address, password,childhood_name,photo)
      VALUES (?, ?, ?, ?, ?,?,?);
    `;

    const values = [name, phone, email, address,hashedPassword,childhood_name,photo];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          return next(); 
        } else {
          const errorMsg = "User already registered. Please try again";
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
    const successMsg = "User Registered successfully";
    
    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  createUserRegisterTableIfItNotCreated,
  isUserPresentInTable,
  saveFormInUserRegisterTable,
  sendSuccessMsg,
};
