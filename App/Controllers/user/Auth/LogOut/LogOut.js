"use strict";

const connection = require("../../../../database/db");
const { queryAsync, returnServerRes } = require("../../../../Helper");

async function validateToken(req, res, next) {
  try {
    const accessToken = req?.headers["x-access-user-token"];
    const refreshToken = req.headers["x-refresh-user-token"];

    if (!accessToken) {
      const errorMsg = `Access token missing. Please provide the access token in the request header. key= x-access-user-token`;
      return returnServerRes(res, 400, false, errorMsg);
    }

    if (!refreshToken) {
      const errorMsg = `Refresh token missing. Please provide the access token in the request header. key= x-refresh-user-token`;
      return returnServerRes(res, 400, false, errorMsg);
    }
    // const user_id=req.user_id;
    // console.log("user_id",user_id)
    return next();
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function deleteLoginInFoInDb(req, res, next) {
  try {
    const refreshToken = req.headers["x-refresh-user-token"];

    const deleteSqlQuery = `
    DELETE FROM user_login_info
    WHERE refresh_token = ?;
    `;
    const VALUES = [refreshToken];
    const reqDb = await queryAsync(
      connection,
      deleteSqlQuery,
      VALUES,
      res,
      "Getting error when try to log-out user!!!"
    );

    // Log out successfully
    if (reqDb.affectedRows) return next();

    const errorMsg = `You already log out`;
    return returnServerRes(res, 200, true, errorMsg);
    //   User already logout
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function sendSuccessMsg(req, res) {
  try {
    const successMsg = `Log out successfully.`;
    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = { validateToken, deleteLoginInFoInDb, sendSuccessMsg };
