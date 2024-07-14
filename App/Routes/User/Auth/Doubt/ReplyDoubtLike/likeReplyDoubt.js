"use strict";

const express = require("express");
const router = express.Router();

const {
  IsReplyDoubtIdExists,
  AlreadyLikedReplyDoubt,
  PostLikes,
  TotalLikedByReplyDoubt
} = require("../../../../../Controllers/user/Auth/Doubt/ReplyDoubtLike/likeReplyDoubt");

router.use(
  IsReplyDoubtIdExists,
  AlreadyLikedReplyDoubt,
  PostLikes,
  TotalLikedByReplyDoubt
);

module.exports = router;
