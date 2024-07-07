"use strict";

const express = require("express");
const router = express.Router();

const {
  IsBlogIdExists,
  AlreadySavedBlog,
  PostSaved
} = require("../../../../../Controllers/user/Auth/Blog/SavedBlog/savedblog");

router.use(
  IsBlogIdExists,
  AlreadySavedBlog,
  PostSaved
);

module.exports = router;
