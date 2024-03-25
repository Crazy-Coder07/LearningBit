"use strict";

const express = require("express");
const router = express.Router();

const {
  validateTokenAndUserid,
  getInstructorProfileData,
  checkIfUserAreInstructorOrNot,
} = require("../../../../../Controllers/user/Auth/Instructor/GetProfile/getprofile");

router.use(
    validateTokenAndUserid, 
    checkIfUserAreInstructorOrNot,
    getInstructorProfileData
);

module.exports = router;
