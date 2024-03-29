"use strict";

const express = require("express");
const router = express.Router();

const {
  IsQuizIdExists,
  AlreadyEnrolledTheQuiz,
  NewEnrollement
} = require("../../../../../Controllers/user/Auth/Quiz/EnrolledQuiz/enrolledQuiz");

router.use(
  IsQuizIdExists,
  AlreadyEnrolledTheQuiz,
  NewEnrollement
);

module.exports = router;
