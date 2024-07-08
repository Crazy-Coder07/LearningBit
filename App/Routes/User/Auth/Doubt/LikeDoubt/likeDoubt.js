"use strict";

const express = require("express");
const router = express.Router();

const {
  IsDoubtIdExists,
  AlreadyLikedDoubt,
  PostLikes,
  TotalLikedByDoubt
} = require("../../../../../Controllers/user/Auth/Doubt/LikeDoubt/likeDoubt");

router.use(
  IsDoubtIdExists,
  AlreadyLikedDoubt,
  PostLikes,
  TotalLikedByDoubt
);

module.exports = router;
