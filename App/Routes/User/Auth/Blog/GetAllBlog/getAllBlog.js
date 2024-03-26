"use strict";

const express = require("express");
const router = express.Router();

const {
  GetAllBlogs
} = require("../../../../../Controllers/user/Auth/Blog/GetAllBlog/getAllBlog");

router.use(
  GetAllBlogs
);

module.exports = router;
