"use strict";

const connection = require("../../../database/db");
const { sanitizeString, returnServerRes, queryAsync } = require("../../../Helper");
const {
    CreateUserRegisterTable
} = require("../../../Model/user/Registration/userRegisteTable");
const bcrypt = require('bcrypt');
const fs = require("fs");
const { createJwtToken } = require("../../../Helper/jwt");
const dotenv=require("dotenv");
dotenv.config(); 


async function sanitizeBody(req, res, next) {
  try {
    const {
      email,
      password
    } = req.body;

    req.sanitizeBody_Data = {
      email: sanitizeString(email),
      password: sanitizeString(password),
    };

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
    const errorMsg ="user is not registered please done registration first";
     return returnServerRes(res, 400, false, errorMsg);
    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function IsPasswordMatchOrNot(req, res, next) {
  try {
    const { email, password } = req.sanitizeBody_Data;

    const sql = "SELECT password FROM userregister WHERE email = ?";

    connection.query(sql, [email,password], async (error, results) => {
      if (error) {
        console.error("Error retrieving user data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          const hashedPasswordFromDB = results[0].password;
          const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);
          if (passwordMatch) {
            req.PasswordVeryfied=results;
            return next();
          } else {
            return returnServerRes(res, 400, false, "Incorrect password");
          }
        } else {
          return returnServerRes(res, 404, false, "User not found");
        }
      }
    });
  } catch (error) {
    console.error("Error checking password:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function getUserIdWhenVerifyPassword(req, res, next) {
  const { email } = req.sanitizeBody_Data;

  const sqlQuery = `
    SELECT id
    FROM userregister
    WHERE email = ?;
`;
  const reqDb = await queryAsync(
    connection,
    sqlQuery,
    [email],
    res,
    "Getting error when finding the user id from email: "
  );
  if (reqDb.length) {
    req.user_id = reqDb[0].id;
    return next();
  }
  return returnServerRes(res, 400, true, "Invalid phone number", "");
}


async function createJwt(req, res, next) {
  try {
    const user_id= req.user_id;
    // Signature
    const USER_JWT_ACCESS_TOKEN_SIGNATURE =
      process.env.USER_JWT_ACCESS_TOKEN_SIGNATURE;
    const USER_JWT_REFRESH_TOKEN_SIGNATURE =
      process.env.USER_JWT_REFRESH_TOKEN_SIGNATURE;

    //   Validity
    const USER_JWT_ACCESS_TOKEN_SIGNATURE_VALIDITY =
      process.env.USER_JWT_ACCESS_TOKEN_SIGNATURE_VALIDITY;
    const USER_JWT_REFRESH_TOKEN_SIGNATURE_VALIDITY =
      process.env.USER_JWT_REFRESH_TOKEN_SIGNATURE_VALIDITY;

    const payload = {
      user_id,
    };
    // Refresh Token
    const refreshToken = await createJwtToken(
      payload,
      USER_JWT_REFRESH_TOKEN_SIGNATURE_VALIDITY,
      USER_JWT_REFRESH_TOKEN_SIGNATURE
    );
   
    // Access Token
    const accessToken = await createJwtToken(
      payload,
      USER_JWT_ACCESS_TOKEN_SIGNATURE_VALIDITY,
      USER_JWT_ACCESS_TOKEN_SIGNATURE
    );

    req.token = {
      accessToken,
      refreshToken
    };

    return next();   
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function saveTokenInDb(req, res, next) {
  try {
    const user_id=req.user_id;
    console.log(user_id);
    const { accessToken: access_token, refreshToken: refresh_token }=req.token;

    const sql = `
        INSERT INTO user_login_info (user_id, access_token, refresh_token)
        VALUES (?, ?, ?);
      `;
    const values = [
      user_id,
      access_token,
      refresh_token,
    ];
    // (Use your database library to perform the actual database query)
    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Record inserted successfully");
        return next();
      }
    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function sendTokenToPhysios(req, res) {
  try {
    const { accessToken, refreshToken } = req.token;
    const token = { accessToken, refreshToken };
    const successMsg = `Password verification Successfully`;
    return returnServerRes(res, 200, true, successMsg, token);
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  isUserPresentInTable,
  IsPasswordMatchOrNot,
  getUserIdWhenVerifyPassword,
  createJwt,
  saveTokenInDb,
  sendTokenToPhysios,
};
