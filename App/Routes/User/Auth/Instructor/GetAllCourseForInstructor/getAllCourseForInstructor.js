"use strict";

const express = require("express");
const router = express.Router();

const {
  getParticularInstructorAllCourseData
} = require("../../../../../Controllers/user/Auth/Instructor/GetAllCourseForInstructor/getAllCourseForInstructor");

router.use(
    getParticularInstructorAllCourseData
);

module.exports = router;
