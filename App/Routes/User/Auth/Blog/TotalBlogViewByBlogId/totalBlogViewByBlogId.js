"use strict";

const express = require("express");
const router = express.Router();

const {
  IsBlogIdExists,
  UpdateViewsByBlogId,
  TotalViews
} = require("../../../../../Controllers/user/Auth/Blog/TotalBlogViewByBlogId/totalBlogViewByBlogId");

router.use(
  IsBlogIdExists,
  UpdateViewsByBlogId,
  TotalViews
);

module.exports = router;
