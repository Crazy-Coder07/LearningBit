"use strict";

const connection = require("../../../database/db");
const { returnServerRes } = require("../../../Helper");
const { verify_JWT, createJwtToken } = require("../../../Helper/jwt");

async function verifyHeaderForRefreshToken(req, res, next) {
  try {
    const refreshToken = req?.headers["x-refresh-token"];

    //   If not present
    if (!refreshToken) {
      const errorMsg = `Refresh token missing. Please provide the refresh token in the request header. key x-refresh-token`;
      return returnServerRes(res, 400, false, errorMsg);
    }

    //  Present Refresh token
    return next();
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function verifyWithJwtSignature(req, res, next) {
  try {
    const refreshToken = req?.headers["x-refresh-token"];

    //   Verify Token
    const signature = process.env.USER_JWT_REFRESH_TOKEN_SIGNATURE;
    const verifyToken = await verify_JWT(refreshToken, signature);

    req.verifyToken = verifyToken;
    //   Jwt successfully verified
    if (verifyToken.jwtSuccess) {
      req.verifyToken = verifyToken;
      return next();
    }

    //   jwt modified
    if (verifyToken.decoded === "jwt malformed" && !verifyToken.jwtSuccess) {
      const errorMsg = `The provided REFRESH TOKEN has been tampered with or modified.`;
      // return returnServerRes(res, false, false, 401, errorMsg);
      return returnServerRes(res, 400, false, errorMsg);
    }

    // Expired token
    if (verifyToken.decoded === "jwt expired" && !verifyToken.jwtSuccess) {
      //  Return next because we delete the login in user info when try to generate new access token
      return next();
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

async function validateAccessTokenAgainstDatabase(req, res, next) {
  try {
    const refreshToken = req?.headers["x-refresh-token"];
    const sqlQuery = `
  SELECT refresh_token FROM user_login_info WHERE refresh_token = ?;
`;

    connection.query(sqlQuery, [refreshToken], (error, results) => {
      if (error) {
        console.error("Error checking refresh_token:", error);
        // Handle the error
        console.log(results);
      } else {
        if (results.length > 0) {
          // Handle the case where the refresh token exists
          return next();
        } else {
          // Handle the case where the refresh token does not exist

          const errorMsg = `Invalid token`;
          return returnServerRes(res, 401, false, errorMsg);
        }
      }
    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function isTokenExpiredDeleteLoginInfo(req, res, next) {
  try {
    const verifyToken = req.verifyToken;
    const refreshToken = req?.headers["x-refresh-token"];

    // Token not expired
    if (verifyToken.jwtSuccess) return next();

    // If token expired
    const sqlQuery = `
  DELETE FROM user_login_info WHERE refresh_token = ?;
`;

    connection.query(sqlQuery, [refreshToken], (error, results) => {
      if (error) {
        console.error("Error deleting refresh_token:", error);
        // Handle the error
      } else {
        if (results.affectedRows > 0) {
          // Handle the case where the record was deleted
          console.log("Record deleted successfully.");

          const errorMsg = `The REFRESH token has expired. Please login again`;
          return returnServerRes(res, 400, false, errorMsg);
        } else {
          // Handle the case where no matching record was found
          console.log("No matching record found for the refresh token.");

          const errorMsg = `The REFRESH token has expired. Please login again`;
          return returnServerRes(res, 400, false, errorMsg);
        }
      }
    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function createNewAccessToken(req, res, next) {
  try {
    const verifyToken = req.verifyToken;

    // Signature
    const USER_JWT_ACCESS_TOKEN_SIGNATURE =
      process.env.USER_JWT_ACCESS_TOKEN_SIGNATURE;

    const payload = verifyToken?.decoded?.data;
    //  Validity
    const USER_JWT_ACCESS_TOKEN_SIGNATURE_VALIDITY =
      process.env.USER_JWT_ACCESS_TOKEN_SIGNATURE_VALIDITY;

    // Access Token
    const newAccessToken = await createJwtToken(
      payload,
      USER_JWT_ACCESS_TOKEN_SIGNATURE_VALIDITY,
      USER_JWT_ACCESS_TOKEN_SIGNATURE
    );

    req.newAccessToken = newAccessToken;
    return next();
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, false, false, 500, "Internal server error");
  }
}

async function updateAccessTokenInDatabase(req, res, next) {
  try {
    const {user_id } = req.verifyToken?.decoded?.data;
    const refreshToken = req?.headers["x-refresh-token"];
    const newAccessToken = req.newAccessToken;
    // Update the refresh_token column where both patient_id and refresh_token match

    const sqlQuery = `
  UPDATE user_login_info SET access_token = ? WHERE user_id = ? AND refresh_token = ?;
`;

    const value = [
      newAccessToken,
      user_id,
      refreshToken,
    ];
    connection.query(sqlQuery, value, (error, results) => {
      if (error) {
        console.error("Error updating access_token:", error);
        // Handle the error
        const errorMsg = `Error updating access_token, Try again!!!`;
        return returnServerRes(res, 400, false, errorMsg);
      } else {
        if (results.affectedRows > 0) {
          // console.log("Access token updated successfully.");
          // Handle the case where the access token was updated
          return next();
        } else {
          console.log(
            "No matching record found for the provided patient_id and refresh token."
          );
          // Handle the case where no matching record was found
          const errorMsg = `No matching record found `;
          return returnServerRes(res, 400, false, error);
        }
      }
    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function sendSuccessResponse(req, res) {
  try {
    const newAccessToken = req.newAccessToken;
    const message = `Access Token Updated Successfully`;
    const payload = { newAccessToken };
    return returnServerRes(res, 200, true, message, payload);
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}
module.exports = {
  verifyHeaderForRefreshToken,
  verifyWithJwtSignature,
  validateAccessTokenAgainstDatabase,
  isTokenExpiredDeleteLoginInfo,
  createNewAccessToken,
  updateAccessTokenInDatabase,
  sendSuccessResponse,
};
