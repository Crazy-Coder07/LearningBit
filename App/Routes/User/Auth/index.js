"use strict";

const express = require("express");
const router = express.Router();

const {
    validateToken,
    isUserIdValid,
    validateAccessTokenAgainstDatabase,
  } = require("../../../Controllers/user/Auth/middleware/auth");
  
  // Middleware for validating user_id like user_id=req.user_id from token
  router.use(
    validateToken,
    isUserIdValid,
    validateAccessTokenAgainstDatabase
  );

const logOut = require("./LogOut/LogOut");
const profile=require("./Profile/index");
const instructor=require("./Instructor/index");


router.delete("/log-out", logOut);
router.use("/profile",profile);
router.use("/instructor",instructor);


module.exports = router;
