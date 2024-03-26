"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  saveStudentFeedBack,
  sendSuccessMsg
} = require("../../../../Controllers/user/Auth/StudentFeedBack/studentFeedBack");

router.use(
  sanitizeBody,
  saveStudentFeedBack,
  sendSuccessMsg
);

module.exports = router;
