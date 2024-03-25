"use strict";

const connection = require("../../../../../database/db");
const {returnServerRes, sanitizeString } = require("../../../../../Helper");

async function sanitizeBody(req, res, next) {
  try {
    const {
      name,
      phone,
      address
    } = req.body;

    req.sanitizeBody_Data = {
      name: sanitizeString(name),
      phone: sanitizeString(phone),
      address:sanitizeString(address),
    };
    return next();
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error catch1");
  }
}

async function validateuser_id(req, res, next) {
  try {
    const user_id = req.user_id;
  
      const userQuery = `
         SELECT id
         FROM userregister
         WHERE id = ?
      `;
  
      const value = [user_id];
  
      connection.query(userQuery, value, (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return returnServerRes(res, 500, false, "Internal server error in id");
        }
        if (results.length == 0) {
          return returnServerRes(res, 404, false, "User not found");
        }

        return next();
      });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error catch2");
  }
}

async function UpdateProfileAndSaveIntoDatabase(req, res, next) {
  try {
    const user_id=req.user_id;
    const {name,phone,address}=req.sanitizeBody_Data;

    const photo = req.file ? req.file.filename : null;
   
    if (!photo) {
      return returnServerRes(res, 400, false, "Error in uploading image");
    }

    const updateprofileQuery = `
    UPDATE userregister
    SET name=?, phone=?, address=?,photo=?
    WHERE id = ?;
    `;

    const value = [name,phone,address,photo,user_id];
    console.log("values",value);
    connection.query(updateprofileQuery, value, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return returnServerRes(res, 500, false, "Internal server error in query");
      }
      if (results.affectedRows > 0) {
        return next(); 
      } else {
        const errorMsg = `User with ID ${user_id} not found or no changes were made`;
        return returnServerRes(res, 404, false, errorMsg);
      }
    })
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error3");
  }
}

async function sendSuccessMsg(req, res) {
  try {
    const successMsg = `profile updated successfully`;
    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error4");
  }
}

module.exports = { 
    sanitizeBody, 
    validateuser_id, 
    UpdateProfileAndSaveIntoDatabase, 
    sendSuccessMsg 
};
