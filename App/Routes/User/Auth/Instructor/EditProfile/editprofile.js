"use strict";

const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer().fields([
  { name: "Aadhar_Front", maxCount: 1 },
  { name: "Aadhar_Back", maxCount: 1 },
  { name: "Highest_Degree", maxCount: 1 },
  { name: "profile_photo", maxCount: 1 },
]);

const {
  handelSchemaJoi,
  handelSchemaJoi_AfterSanitize,
} = require("../../../../../Schema/user/Auth/instructor/Registration/userRegister");

const {
  sanitizeBody,
  areAllFilesPresent,
  isStudentPresentInTable,
  isInstructorPresentInTable,
  saveDocuments,
  saveFormInUserRegisterTable,
  sendSuccessMsg
} = require("../../../../../Controllers/user/Auth/Instructor/EditProfile/editprofile");

router.use(
  upload,
  handelSchemaJoi,
  sanitizeBody,
  handelSchemaJoi_AfterSanitize,
  areAllFilesPresent,
  isStudentPresentInTable,
  isInstructorPresentInTable,
  saveDocuments,
  saveFormInUserRegisterTable,
  sendSuccessMsg
);

module.exports = router;
