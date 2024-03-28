"use strict";

const express = require("express");
const router = express.Router();

const {
  IsBlogIdExists,
  IsInstructorIdExists,
  UpdateViewsByBlogId
} = require("../../../../../Controllers/user/Auth/Blog/TotalBlogViewByBlogId/totalBlogViewByBlogId");

router.use(
  IsBlogIdExists,
  IsInstructorIdExists,
  UpdateViewsByBlogId
);

module.exports = router;
