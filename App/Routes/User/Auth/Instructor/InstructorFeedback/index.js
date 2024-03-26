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

const InstructorFeedBack = require("./InstructorFeedBack");


router.post("/",upload.single("image"),InstructorFeedBack);


module.exports = router;
