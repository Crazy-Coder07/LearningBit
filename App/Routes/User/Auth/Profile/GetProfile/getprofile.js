"use strict";

const express = require("express");
const router = express.Router();

const {
  validateTokenAndUserid,
  getUserProfileData,
  sendSuccessMsg
} = require("../../../../../Controllers/user/Auth/Profile/GetProfile/getprofile");

router.use(
    validateTokenAndUserid, 
    getUserProfileData, 
    sendSuccessMsg
);

module.exports = router;
