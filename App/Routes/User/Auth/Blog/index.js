"use strict";

const express = require("express");
const router = express.Router();

const GetAllBlog = require("./GetAllBlog/getAllBlog");
const GetBlogById = require("./GetBlogById/getBlogById");
const LikeBlog = require("./LikeBlog/likeBlog");
const DisLikeBlog = require("./DisLikeBlog/disLikeBlog");
const TotalBlogViewByBlogId = require("./TotalBlogViewByBlogId/totalBlogViewByBlogId");
const SavedBlog =require("./SavedBlog/savedblog");
const UnsavedBlog =require("./UnsavedBlog/unsavedblog");



router.get("/get-all-blog",GetAllBlog);
router.get("/get-blog-by-id",GetBlogById);
router.post("/like-blog",LikeBlog);
router.post("/dislike-blog",DisLikeBlog);
router.patch("/total-view-by-blog-id",TotalBlogViewByBlogId);
router.post("/saved-blog",SavedBlog);
router.post("/unsaved-blog",UnsavedBlog);




module.exports = router;
