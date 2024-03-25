"use strict";

const express = require("express");
const router = express.Router();

const {
  validateTokenAndUserid,
  checkIfUserAreInstructorOrNot,
  getParticularInstructorAllCourseData,
} = require("../../../../../Controllers/user/Auth/Instructor/GetAllCourseForInstructor/getAllCourseForInstructor");

router.use(
    validateTokenAndUserid, 
    checkIfUserAreInstructorOrNot,
    getParticularInstructorAllCourseData, 
);

module.exports = router;
