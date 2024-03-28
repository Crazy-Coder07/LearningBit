"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  saveTheQuizIntoDb,
  saveTheQuizDurationIntoDb,
  saveTheQuizQuestionAnswer,
  sendSuccessMsg
} = require("../../../../../Controllers/user/Auth/Instructor/createQuiz/createQuiz");

router.use(
  sanitizeBody,
  saveTheQuizIntoDb,
  saveTheQuizDurationIntoDb,
  saveTheQuizQuestionAnswer,
  sendSuccessMsg
);

module.exports = router;
