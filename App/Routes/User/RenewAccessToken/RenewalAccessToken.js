"use strict";

const express = require("express");
const router = express.Router();

const {
  verifyHeaderForRefreshToken,
  verifyWithJwtSignature,
  validateAccessTokenAgainstDatabase,
  isTokenExpiredDeleteLoginInfo,
  createNewAccessToken,
  updateAccessTokenInDatabase,
  sendSuccessResponse,
} = require("../../../Controllers/user/RenewAccessToken/RenewalAccessToken");



router.use(
  verifyHeaderForRefreshToken,
  verifyWithJwtSignature,
  validateAccessTokenAgainstDatabase,
  isTokenExpiredDeleteLoginInfo,
  createNewAccessToken,
  updateAccessTokenInDatabase,
  sendSuccessResponse
);

module.exports = router;
