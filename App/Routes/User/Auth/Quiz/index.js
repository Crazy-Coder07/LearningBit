"use strict";

const express = require("express");
const router = express.Router();

const GetAllQuiz = require("./GetAllQuiz/getAllQuiz");
const GetQuizById = require("./GetQuizById/getQuizById");
const EnrolledQuiz = require("./EnrolledQuiz/enrolledQuiz");
const UpdatePercentageAfterQuiz = require("./UpdatePercentageAfterQuiz/updatePercentageAfterQuiz");



router.get("/get-all-quiz",GetAllQuiz);
router.get("/get-quiz-by-id",GetQuizById); 
router.post("/enrolled-quiz",EnrolledQuiz);
router.patch("/Update-percentage-after-quiz",UpdatePercentageAfterQuiz);



module.exports = router;
