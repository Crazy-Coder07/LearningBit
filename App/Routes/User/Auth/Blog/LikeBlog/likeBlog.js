"use strict";

const express = require("express");
const router = express.Router();

const {
  IsBlogIdExists,
  AlreadyLikedBlog,
  PostLikes,
  TotalLikedByBlog
} = require("../../../../../Controllers/user/Auth/Blog/LikeBlog/likeBlog");

router.use(
  IsBlogIdExists,
  AlreadyLikedBlog,
  PostLikes,
  TotalLikedByBlog
);

module.exports = router;
