"use strict";

const express = require("express");
const router = express.Router();
const { 
    checkIfUserAreInstructorOrNot 
} = require("../../../../Controllers/user/Auth/middleware/auth");

  
const InsRegister=require("./Registration/registration");
const editprofile=require("./EditProfile/editprofile");
const getprofile=require("./GetProfile/getprofile");
const createCourse=require("./CreateCourse/createCourse");
const GetAllCourseForInstructor=require("./GetAllCourseForInstructor/getAllCourseForInstructor");
const GetCourseByIdForInstructor=require("./GetCourseByIdForInstructor/getAllCourseForInstructor");
const InstructorFeedback=require("./InstructorFeedback/index");
const InstructorCreateBlog=require("./Blogs/index");





router.post("/ins-register",InsRegister);

router.use(checkIfUserAreInstructorOrNot);
router.get("/ins-get-profile",getprofile);
router.patch("/ins-edit-profile",editprofile);
router.post("/ins-create-course",createCourse);
router.get("/ins-get-all-course",GetAllCourseForInstructor);
router.get("/ins-get-course-by-id",GetCourseByIdForInstructor);
router.use("/ins-feedback",InstructorFeedback)
router.use("/ins-blog",InstructorCreateBlog)




module.exports = router;
