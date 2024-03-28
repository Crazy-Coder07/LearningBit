"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  PostDoubtByStudent,
  sendSuccessMsg
} = require("../../../../../Controllers/user/Auth/Doubt/PostDoubt/postDoubt");

router.use(
  sanitizeBody,
  PostDoubtByStudent,
  sendSuccessMsg
);

module.exports = router;
