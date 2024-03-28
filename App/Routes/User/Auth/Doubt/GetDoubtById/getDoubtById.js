"use strict";

const express = require("express");
const router = express.Router();

const {
  IsDoubtIdExists,
  GetDoubtById
} = require("../../../../../Controllers/user/Auth/Doubt/GetDoubtById/getDoubtById");

router.use(
  IsDoubtIdExists,
  GetDoubtById
);

module.exports = router;
