"use strict";

const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../../../../uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
});
  
const upload = multer({ storage: storage });

const editprofile=require("./EditProfile/editprofile");

const getprofile=require("./GetProfile/getprofile");

router.patch("/edit-profile",upload.single("image"),editprofile);

router.get("/get-profile",getprofile)


module.exports = router;
