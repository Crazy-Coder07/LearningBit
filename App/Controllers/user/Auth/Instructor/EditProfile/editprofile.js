"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");
const {
  CreateInstructorRegisterTable
} = require("../../../../../Model/user/Auth/Registration/instructorRegisteTable");
const fs = require("fs");
const path = require("path");
const path_Resolve = path.resolve();

async function sanitizeBody(req, res, next) {
  try {
    const {
      name,
      phone,
      email,
      address,
      alternate_phone,
      bio,
      subjects,
      experience,
      qualifications
    } = req.body;

    req.sanitizeBody_Data = {
      name: sanitizeString(name),
      phone: sanitizeString(phone),
      email: sanitizeString(email),
      address: sanitizeString(address),
      alternate_phone: sanitizeString(alternate_phone),
      bio: sanitizeString(bio),
      subjects: sanitizeString(subjects),
      experience: sanitizeString(experience),
      qualifications: sanitizeString(qualifications),
    };

    return next();
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function areAllFilesPresent(req, res, next) {
  try {
    const needFiles = [
      "Aadhar_Front",
      "Aadhar_Back",
      "Highest_Degree",
      "profile_photo",
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

async function isStudentPresentInTable(req, res, next) {
  try {
    const user_id = req.user_id;
    if (!user_id) {
      return returnServerRes(res, 400, false, "x-student-id is missing");
    }

    const sql =
      "SELECT id FROM instructor WHERE student_id=?";

    await connection.query(sql, [user_id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }

      //  if user is already registered
      if (results.length > 0) {
        return next();

      }

      //  if user is not registered 
      const errorMsg =
        "this student is already applied for the instructor please wait some time then apply again";
      return returnServerRes(res, 400, false, errorMsg);

    });
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function isInstructorPresentInTable(req, res, next) {
  try {

    const instructor_id = req.headers["x-instructor-id"];

    const sql =
      "SELECT id FROM instructor WHERE id = ?";

    await connection.query(sql, [instructor_id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }

      //  if user is already registered
      if (results.length > 0) {
        return next();

      }
      const errorMsg =
        "Instructor is Not Registered";
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
        const filePath = `/uploads/InstructorRegistration/${Date.now()}-${file.originalname}`;

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
    const { name,
      phone,
      email,
      address,
      alternate_phone,
      bio,
      subjects,
      experience,
      qualifications } = req.sanitizeBody_Data;

    const {
      Aadhar_Front,
      Aadhar_Back,
      Highest_Degree,
      profile_photo,
    } = req.saveDocumentPath;

    const user_id = req.user_id;
    const instructor_id = req.headers["x-instructor-id"];


    const sql = `
    UPDATE instructor
    SET
      name = ?,
      phone = ?,
      email = ?,
      address = ?,
      alternate_phone = ?,
      bio = ?,
      subjects = ?,
      experience = ?,
      qualifications = ?,
      Aadhar_Front = ?,
      Aadhar_Back = ?,
      Highest_Degree = ?,
      profile_photo = ?
    WHERE
      id = ?;
    `;

    const values = [name, phone, email, address, alternate_phone, bio, subjects, experience, qualifications, Aadhar_Front, Aadhar_Back, Highest_Degree, profile_photo, instructor_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          return next();
        } else {
          const errorMsg = "Something Went Wrong. Please try again";
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
    const successMsg = "Instructor Profile Updated successfully";

    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  areAllFilesPresent,
  isStudentPresentInTable,
  isInstructorPresentInTable,
  saveDocuments,
  saveFormInUserRegisterTable,
  sendSuccessMsg,
};
