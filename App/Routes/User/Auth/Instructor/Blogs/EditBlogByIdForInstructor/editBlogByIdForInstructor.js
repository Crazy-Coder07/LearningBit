"use strict";

const express = require("express");
const router = express.Router();

const {
  sanitizeBody,
  EditBlogByIdForInstructor,
  sendSuccessMsg
} = require("../../../../../../Controllers/user/Auth/Instructor/Blogs/EditBlogByIdForInstructor/editBlogByIdForInstructor");

router.use(
  sanitizeBody,
  EditBlogByIdForInstructor,
  sendSuccessMsg
);

module.exports = router;
