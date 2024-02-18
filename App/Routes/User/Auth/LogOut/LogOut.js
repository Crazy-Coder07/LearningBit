"use strict";

const express = require("express");
const router = express.Router();

const {
  validateToken,
  deleteLoginInFoInDb,
  sendSuccessMsg,
} = require("../../../../Controllers/user/Auth/LogOut/LogOut");

router.use(
    validateToken, 
    deleteLoginInFoInDb, 
    sendSuccessMsg
);

module.exports = router;
