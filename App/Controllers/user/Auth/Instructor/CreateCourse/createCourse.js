"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");
const {
  CreateInstructorCourseTable
} = require("../../../../../Model/user/Auth/CreateCourse/createCourse");
const fs = require("fs");
const path = require("path");
const path_Resolve = path.resolve();

async function sanitizeBody(req, res, next) {
  try {
    const {
      course_name,
      description  ,
      duration ,
      level_status,
      Price,
      course_fee_status,
      prerequisites
    } = req.body;

    req.sanitizeBody_Data = {
      course_name: sanitizeString(course_name),
      description: sanitizeString(description ),
      duration: sanitizeString(duration),
      level_status: sanitizeString(level_status),
      Price: sanitizeString(Price),
      course_fee_status: sanitizeString(course_fee_status),
      prerequisites: sanitizeString(prerequisites)
    };

    return next();
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function createInstructorCourseTableIfItNotCreated(req, res, next) {
  try {
    connection.query(CreateInstructorCourseTable, (queryErr, results) => {
      if (queryErr) {
        console.error("Error userregister table:", queryErr);
        console.log(error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        console.log("userRegister table created successfully");
        return next();
      }
    });
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function areAllFilesPresent(req, res, next) {
  try {
    const needFiles = [
      "title_image",
      "preview_video"
    ];

    const files = req.files;

    // Check if any required field is missing
    const missingField = needFiles.find((field) => !files[field]);

    if (missingField) {
      const errorMsg = `${missingField} file is missing.`;
      return returnServerRes(res, 400, false, errorMsg);
    } else {
      return next();
    }
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


async function isInstructorPresentInTable(req, res, next) {
  try {
    
    const user_id=req.user_id;
    const sql =
      "SELECT id FROM instructor WHERE student_id = ?";

    await connection.query(sql, [user_id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }

      //  if this is an instructor
      if (results.length > 0) {
          req.instructor_id = results[0].id;
         return next();
      }
      const errorMsg =
          "You are not an instructor please apply for the instructor ";
        return returnServerRes(res, 400, false, errorMsg);

    });
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function saveDocuments(req, res, next) {
  try {
    req.saveDocumentPath = {};

    if (!req.files) {
      const errorMsg = `Document is required`;
      return returnServerRes(res, 400, false, errorMsg);
    }

    //
    const files = req.files;

    // Iterate through each file type
    Object.keys(files).forEach((fileKey) => {
      const fileArray = files[fileKey];

      // Iterate through each file in the array
      fileArray.forEach((file) => {
        const filePath = `/uploads/createCourse/${Date.now()}-${file.originalname}`;

        // Add the new "filePath" to the req.saveDocumentPath array
        req.saveDocumentPath[file.fieldname] = filePath;

        fs.writeFile(
          `${path_Resolve}/${filePath}`,
          new Uint8Array(Buffer.from(file.buffer)),
          (err) => {
            if (!err) {
              // Assuming req.filePath is an array, push the new file path
              if (!req.filePath) {
                req.filePath = [];
              }
              req.filePath.push(filePath);
            } else {
              return returnServerRes(res, 400, false, err.message);
            }
          }
        );
      });
    });

    // Continue with the next middleware or response logic
    return next();
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 400, false, "Internal server error");
  }
}

async function saveFormInUserRegisterTable(req, res, next) {
  try {

    const category_id=req.headers["x-category-id"]

    const { 
      course_name,
      description  ,
      duration ,
      level_status,
      Price,
      course_fee_status,
      prerequisites
    } = req.sanitizeBody_Data;

    const {
      title_image,
      preview_video,
    } = req.saveDocumentPath;

    const instructor_id = req.instructor_id;

    const sql = `
      INSERT INTO course (course_name,description , duration, level_status, Price, course_fee_status,prerequisites,title_image,preview_video,category_id,instructor_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [course_name,description  ,duration ,level_status,Price,course_fee_status,prerequisites,title_image,preview_video,category_id,instructor_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          return next();
        } else {
          const errorMsg = "User already registered. Please try again";
          return returnServerRes(res, 500, false, errorMsg);
        }
      }
    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function sendSuccessMsg(req, res, next) {
  try {
    const successMsg = "Course Created Successfully";

    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  createInstructorCourseTableIfItNotCreated,
  areAllFilesPresent,
  isInstructorPresentInTable,
  saveDocuments,
  saveFormInUserRegisterTable,
  sendSuccessMsg,
};
