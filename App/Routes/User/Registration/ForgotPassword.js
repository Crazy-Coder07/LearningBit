"use strict";

const express = require("express");
const router = express.Router();


const {
  sanitizeBody,
  isUserPresentInTable,
  IsChildhoodNameMatchOrNot,
  saveNewPassword,
  sendSuccessMsg
} = require("../../../Controllers/user/Registration/ForgotPassword");

router.use(
  sanitizeBody,
  isUserPresentInTable,
  IsChildhoodNameMatchOrNot,
  saveNewPassword,
  sendSuccessMsg
);

module.exports = router;
