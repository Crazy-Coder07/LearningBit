"use strict";

const express = require("express");
const router = express.Router();

const {
  IsDoubtIdExists,
  AlreadyLikedDoubt,
  PostLikes
} = require("../../../../../Controllers/user/Auth/Doubt/LikeDoubt/likeDoubt");

router.use(
  IsDoubtIdExists,
  AlreadyLikedDoubt,
  PostLikes
);

module.exports = router;
