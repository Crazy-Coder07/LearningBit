"use strict";

const express = require("express");
const router = express.Router();

const {
  handelSchemaJoi,
  handelSchemaJoi_AfterSanitize,
} = require("../../../Schema/user/Registration/userRegister");

const {
  sanitizeBody,
  createUserRegisterTableIfItNotCreated,
  isUserPresentInTable,
  saveFormInUserRegisterTable,
  sendSuccessMsg
} = require("../../../Controllers/user/Registration/Register");

router.use(
  handelSchemaJoi,
  sanitizeBody,
  handelSchemaJoi_AfterSanitize,
  createUserRegisterTableIfItNotCreated,
  isUserPresentInTable,
  saveFormInUserRegisterTable,
  sendSuccessMsg
);

module.exports = router;
