"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  IsDoubtIdExists,
  ReplyDoubttByStudent,
  sendSuccessMsg
} = require("../../../../../Controllers/user/Auth/Doubt/ReplyDoubt/replyDoubt");

router.use(
  sanitizeBody,
  IsDoubtIdExists,
  ReplyDoubttByStudent,
  sendSuccessMsg
);

module.exports = router;
