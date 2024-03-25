"use strict";

const express = require("express");
const router = express.Router();

  
const InsRegister=require("./Registration/registration");
const editprofile=require("./EditProfile/editprofile");
const getprofile=require("./GetProfile/getprofile");
const createCourse=require("./CreateCourse/createCourse");


router.post("/ins-register",InsRegister);
router.get("/ins-get-profile",getprofile);
router.patch("/ins-edit-profile",editprofile);
router.post("/ins-create-course",createCourse);



module.exports = router;
