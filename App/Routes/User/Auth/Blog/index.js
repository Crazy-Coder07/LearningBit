"use strict";

const express = require("express");
const router = express.Router();

const GetAllBlog = require("./GetAllBlog/getAllBlog");
const GetBlogById = require("./GetBlogById/getBlogById");
const LikeBlog = require("./LikeBlog/likeBlog");
const DisLikeBlog = require("./DisLikeBlog/disLikeBlog");



router.get("/get-all-blog",GetAllBlog);
router.get("/get-blog-by-id",GetBlogById);
router.post("/like-blog",LikeBlog);
router.post("/dislike-blog",DisLikeBlog);




module.exports = router;
