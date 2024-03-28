"use strict";

const express = require("express");
const router = express.Router();

const {
  IsDoubtIdExists,
  GetAllReplyForDoubtId
} = require("../../../../../Controllers/user/Auth/Doubt/GetAllReplyForDoubtId/getAllReplyForDoubtId");

router.use( 
  IsDoubtIdExists,
  GetAllReplyForDoubtId
);

module.exports = router;
