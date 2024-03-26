"use strict";

const express = require("express");
const router = express.Router();

const {
  checkIfCourseAreValidOrNot,
  GetCourseByIdForInstructor,
} = require("../../../../../Controllers/user/Auth/Instructor/GetCourseByIdForInstructor/getCourseByIdForInstructor");

router.use(
  checkIfCourseAreValidOrNot,
  GetCourseByIdForInstructor, 
);

module.exports = router;
