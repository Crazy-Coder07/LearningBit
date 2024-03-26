"use strict";

const express = require("express");
const router = express.Router();

const {
  IsBlogIdExists,
  GetBlogById
} = require("../../../../../Controllers/user/Auth/Blog/GetBlogById/getBlogById");

router.use(
  IsBlogIdExists,
  GetBlogById
);

module.exports = router;
