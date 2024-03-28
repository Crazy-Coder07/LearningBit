"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");

async function IsBlogIdExists(req, res, next) {
  try {
    const blog_id = req.headers["x-blog-id"];
   
    const sql = `
       SELECT id
       FROM blog 
       WHERE id = ?
    `;

    const values = [blog_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if blog id exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          return next();
        } else {
          return returnServerRes(res, 404, false, "Blog ID does not exist");
        }
      }
    });
  } catch (error) {
    console.error("Error checking if blog id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function IsInstructorIdExists(req, res, next) {
  try {
    const instructor_id = req.headers["x-instructor-id"];
   
    const sql = `
       SELECT id
       FROM instructor
       WHERE id = ?
    `;

    const values = [instructor_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if blog id exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          return next();
        } else {
          return returnServerRes(res, 404, false, "Instructor ID does not exist");
        }
      }
    });
  } catch (error) {
    console.error("Error checking if blog id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


async function UpdateViewsByBlogId(req, res, next) {
  try {
    
    const blog_id=req.headers["x-blog-id"]
    const instructor_id=req.headers["x-instructor-id"]
   
    const sql = `
        UPDATE blog
        SET views_count=views_count +1
        WHERE id=? AND instructor_id=?
    `;
    const values = [blog_id,instructor_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `View Increases By 1 for blog_id ==>${blog_id}`;

        return returnServerRes(res, 200, true,successMsg,results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  IsBlogIdExists,
  IsInstructorIdExists,
  UpdateViewsByBlogId
};
