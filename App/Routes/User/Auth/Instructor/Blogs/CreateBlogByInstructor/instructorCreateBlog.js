"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  CreateBlogByInstructor,
  sendSuccessMsg
} = require("../../../../../../Controllers/user/Auth/Instructor/Blogs/CreateBlogByInstructor/instructorCreateBlog");

router.use(
  sanitizeBody,
  CreateBlogByInstructor,
  sendSuccessMsg
);

module.exports = router;
