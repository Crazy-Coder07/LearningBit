"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  isUserPresentInTable,
  IsPasswordMatchOrNot,
  getUserIdWhenVerifyPassword,
  createJwt,
  saveTokenInDb,
  sendTokenToPhysios,
} = require("../../../Controllers/user/Registration/Login");

router.use(
  sanitizeBody,
  isUserPresentInTable,
  IsPasswordMatchOrNot,
  getUserIdWhenVerifyPassword,
  createJwt,
  saveTokenInDb,
  sendTokenToPhysios,
);

module.exports = router;
