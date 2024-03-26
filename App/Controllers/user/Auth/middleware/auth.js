"use strict";

const connection = require("../../../../database/db");
const { returnServerRes } = require("../../../../Helper");
const { verify_JWT } = require("../../../../Helper/jwt");

async function validateToken(req, res, next) {
  try {
    const accessToken = req?.headers["x-access-user-token"];
    if (!accessToken) {
      const errorMsg = `Access token missing. Please provide the access token in the request header. key= x-access-user-token`;
      return returnServerRes(res, 400, false, errorMsg);
    }

    //   Verify Token
    const signature = process.env.USER_JWT_ACCESS_TOKEN_SIGNATURE;
    const verifyToken = await verify_JWT(accessToken, signature);

    //   Jwt successfully verified
    if (verifyToken.jwtSuccess) {
      const { user_id } = verifyToken.decoded.data;

      req.user_info_fromJwt = verifyToken.decoded.data;
      req.user_id = user_id;
      return next();
    }

    //   jwt modified
    if (verifyToken.decoded === "jwt malformed" && !verifyToken.jwtSuccess) {
      const errorMsg = `The provided ACCESS TOKEN has been tampered with or modified.`;
      return returnServerRes(res, 400, false, errorMsg);
    }

    // Expired token
    if (verifyToken.decoded === "jwt expired" && !verifyToken.jwtSuccess) {
      const errorMsg = `The access token has expired. Please renew your token by re-authenticating.`;
      return returnServerRes(res, 401, false, errorMsg);
    }

    // Invalid Token
    if (!verifyToken.jwtSuccess) {
      return returnServerRes(res, 401, false, verifyToken.decoded);
    }
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function isUserIdValid(req, res, next) {
  try {
    const user_id = req.user_id;
    const sql = "SELECT id  FROM userregister WHERE id = ?";

    // Execute the SELECT query
    await connection.query(sql, [user_id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }
      // User Exist
      if (results.length !== 0) {
        return next();
      }
      const errorMsg = `Sorry to say you are not register, please go and register`;
      return returnServerRes(res, 400, false, errorMsg);
    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function validateAccessTokenAgainstDatabase(req, res, next) {
  try {
    const accessToken = req?.headers["x-access-user-token"];
    const sql =
      "SELECT access_token  FROM user_login_info WHERE access_token = ?";

    // Execute the SELECT query
    await connection.query(sql, [accessToken], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }
      // User Exist
      if (results.length !== 0) {
        return next();
      }
      const errorMsg = `Invalid access token`;
      return returnServerRes(res, 401, false, errorMsg);
    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function checkIfUserAreInstructorOrNot(req, res, next) {
  try {
    const user_id = req.user_id;

    const userQuery = `
       SELECT id
       FROM instructor
       WHERE student_id = ?
    `;

    const value = [user_id];

    connection.query(userQuery, value, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return returnServerRes(res, 500, false, "Internal server error");
      }
      if (results.length == 0) {
        return returnServerRes(res, 404, false, "User are Not Instructor Please first apply for the instructor");
      }
      req.instructor_id = results[0].id;
      return next();
    });
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  validateToken,
  isUserIdValid,
  validateAccessTokenAgainstDatabase,
  checkIfUserAreInstructorOrNot
};
