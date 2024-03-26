"use strict";

const express = require("express");
const router = express.Router();

const {
  getInstructorProfileData,
} = require("../../../../../Controllers/user/Auth/Instructor/GetProfile/getprofile");

router.use(
    getInstructorProfileData
);

module.exports = router;
