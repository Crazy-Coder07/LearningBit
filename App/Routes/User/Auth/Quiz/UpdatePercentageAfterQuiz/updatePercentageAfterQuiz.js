"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  IsQuizIdExists,
  // AlreadyEnrolledTheQuiz,
  IpdateThePercentageForEnrollment
} = require("../../../../../Controllers/user/Auth/Quiz/UpdatePercentageAfterQuiz/updatePercentageAfterQuiz");

router.use(
  sanitizeBody,
  IsQuizIdExists,
  // AlreadyEnrolledTheQuiz,
  IpdateThePercentageForEnrollment
);

module.exports = router;
