"use strict";

const express = require("express");
const router = express.Router();

const {
  IsBlogIdExists,
  AlreadyDisLikedBlog,
  PostLikes,
  TotalDislikedByBlog
} = require("../../../../../Controllers/user/Auth/Blog/DisLikeBlog/disLikeBlog");

router.use(
  IsBlogIdExists,
  AlreadyDisLikedBlog,
  PostLikes,
  TotalDislikedByBlog
);

module.exports = router;
