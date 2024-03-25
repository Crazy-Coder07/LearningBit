"use strict";

const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer().fields([
  { name: "title_image", maxCount: 1 },
  { name: "preview_video", maxCount: 1 }
]);

const {
  handelSchemaJoi,
  handelSchemaJoi_AfterSanitize,
} = require("../../../../../Schema/user/Auth/instructor/CreateCourse/createCourse");

const {
  sanitizeBody,
  createInstructorCourseTableIfItNotCreated,
  areAllFilesPresent,
  isInstructorPresentInTable,
  saveDocuments,
  saveFormInUserRegisterTable,
  sendSuccessMsg
} = require("../../../../../Controllers/user/Auth/Instructor/CreateCourse/createCourse");

router.use(
  upload,
  handelSchemaJoi,
  sanitizeBody,
  handelSchemaJoi_AfterSanitize,
  createInstructorCourseTableIfItNotCreated,
  areAllFilesPresent,
  isInstructorPresentInTable,
  saveDocuments,
  saveFormInUserRegisterTable,
  sendSuccessMsg
);

module.exports = router;
