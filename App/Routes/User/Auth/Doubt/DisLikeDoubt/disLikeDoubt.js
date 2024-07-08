"use strict";

const express = require("express");
const router = express.Router();

const {
  IsDoubtIdExists,
  AlreadyDisLikedDoubt,
  PostLikes,
  TotalDislikedByDoubt
} = require("../../../../../Controllers/user/Auth/Doubt/DisLikeDoubt/disLikeDoubt");

router.use(
  IsDoubtIdExists,
  AlreadyDisLikedDoubt,
  PostLikes,
  TotalDislikedByDoubt
);

module.exports = router;
