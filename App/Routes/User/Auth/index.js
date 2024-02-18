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


router.delete("/log-out", logOut);

module.exports = router;
