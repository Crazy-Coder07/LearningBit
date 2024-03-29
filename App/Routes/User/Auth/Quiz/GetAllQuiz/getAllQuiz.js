"use strict";

const express = require("express");
const router = express.Router();

const {
  GetAllQuiz
} = require("../../../../../Controllers/user/Auth/Quiz/GetAllQuiz/getAllQuiz")

router.use(
  GetAllQuiz
);

module.exports = router;
