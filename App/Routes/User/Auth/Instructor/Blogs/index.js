"use strict";

const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../../../../../uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
});
  
const upload = multer({ storage: storage });

const InstructorCreateBlog = require("./CreateBlogByInstructor/instructorCreateBlog");
const GetAllBlogOfInstructor = require("./GetAllBlogOfInstructor/getAllBlogOfInstructor");
const GetBlogByIdForInstructor = require("./GetBlogByIdForInstructor/getBlogByIdForInstructor");
const EditBlogByIdForInstructor = require("./EditBlogByIdForInstructor/editBlogByIdForInstructor");




router.post("/create",upload.single("image"),InstructorCreateBlog);
router.get("/get-all-blog-of-Instructor",GetAllBlogOfInstructor);
router.get("/get-blog-by-id-for-instructor",GetBlogByIdForInstructor);
router.patch("/edit-blog-by-id-for-instructor",upload.single("image"),EditBlogByIdForInstructor);




module.exports = router;
