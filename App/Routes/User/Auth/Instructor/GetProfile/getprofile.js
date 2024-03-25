"use strict";

const express = require("express");
const router = express.Router();

const {
  validateTokenAndUserid,
  getInstructorProfileData,
  checkIfUserAreInstructorOrNot,
  sendSuccessMsg
} = require("../../../../../Controllers/user/Auth/Instructor/GetProfile/getprofile");

router.use(
    validateTokenAndUserid, 
    checkIfUserAreInstructorOrNot,
    getInstructorProfileData, 
    sendSuccessMsg
);

module.exports = router;
