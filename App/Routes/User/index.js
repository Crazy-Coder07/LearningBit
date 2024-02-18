"use strict";

const express = require("express");
const router = express.Router();

// Routes
const  registration=require("../User/Registration/index"); 

const  auth=require("../User/Auth/index"); 

const renewalAccessToken = require("./RenewAccessToken/RenewalAccessToken"); // Renewal access token



//  Route (End-Pont's)
router.use("/registration",registration); // registration

router.use("/auth",auth); // auth

router.get("/renewal-access-token", renewalAccessToken); // renewal access token




module.exports = router;
