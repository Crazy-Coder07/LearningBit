"use strict";

const express = require("express");
const router = express.Router();

const {
  GetAllDoubt
} = require("../../../../../Controllers/user/Auth/Doubt/GetAllDoubt/getAllDoubt");

router.use( 
  GetAllDoubt
);

module.exports = router;
