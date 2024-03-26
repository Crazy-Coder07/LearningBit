"use strict";

const express = require("express");
const router = express.Router();

const {
  IsBlogIdExists,
  AlreadyDisLikedBlog,
  PostLikes
} = require("../../../../../Controllers/user/Auth/Blog/DisLikeBlog/disLikeBlog");

router.use(
  IsBlogIdExists,
  AlreadyDisLikedBlog,
  PostLikes
);

module.exports = router;
