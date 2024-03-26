"use strict";

const express = require("express");
const router = express.Router();

const {
  CreateBlogByInstructor,
} = require("../../../../../../Controllers/user/Auth/Instructor/Blogs/GetAllBlogOfInstructor/getAllBlogOfInstructor");

router.use(
  CreateBlogByInstructor,
);

module.exports = router;
