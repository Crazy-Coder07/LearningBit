"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  validateuser_id,
  UpdateProfileAndSaveIntoDatabase,
  sendSuccessMsg,
} = require("../../../../../Controllers/user/Auth/Profile/EditProfile/editprofile");

router.use(
  sanitizeBody,
  validateuser_id, 
  UpdateProfileAndSaveIntoDatabase, 
  sendSuccessMsg
);

module.exports = router;
