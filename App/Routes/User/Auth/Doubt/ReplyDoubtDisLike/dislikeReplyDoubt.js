"use strict";

const express = require("express");
const router = express.Router();

const {
  IsReplyDoubtIdExists,
  AlreadyDisLikedReplyDoubt,
  PostLikes,
  TotalDisLikedByReplyDoubt
} = require("../../../../../Controllers/user/Auth/Doubt/ReplyDoubtDisLike/dislikeReplyDoubt");

router.use(
  IsReplyDoubtIdExists,
  AlreadyDisLikedReplyDoubt,
  PostLikes,
  TotalDisLikedByReplyDoubt
);

module.exports = router;
