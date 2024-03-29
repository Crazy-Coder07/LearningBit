"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  QuizNameShouldBeUnique,
  saveTheQuizIntoDb,
  saveTheQuizDurationIntoDb,
  saveTheQuizQuestionAnswer,
  sendSuccessMsg
} = require("../../../../../Controllers/user/Auth/Instructor/createQuiz/createQuiz");

router.use(
  sanitizeBody,
  QuizNameShouldBeUnique,
  saveTheQuizIntoDb,
  saveTheQuizDurationIntoDb,
  saveTheQuizQuestionAnswer,
  sendSuccessMsg
);

module.exports = router;
