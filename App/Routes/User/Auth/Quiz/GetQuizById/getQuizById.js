"use strict";

const express = require("express");
const router = express.Router();

const {
  IsQuizIdExists,
  GetQuizById
} = require("../../../../../Controllers/user/Auth/Quiz/GetQuizById/getQuizById");

router.use(
  IsQuizIdExists,
  GetQuizById
);

module.exports = router;
