"use strict";

const express = require("express");
const router = express.Router();

const {
  IsBlogIdExists,
  AlreadyLikedBlog,
  PostLikes
} = require("../../../../../Controllers/user/Auth/Blog/LikeBlog/likeBlog");

router.use(
  IsBlogIdExists,
  AlreadyLikedBlog,
  PostLikes
);

module.exports = router;
