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


async function GetBlogById(req, res, next) {
  try {
    
    const blog_id=req.headers["x-blog-id"]
   
    const sql = `
    SELECT 
         blog.id AS blog_id,
         blog.title AS blog_title,
         blog.content AS blog_content,
         blog.title_image,
         blog.publication_date,
         blog.views_count,
         COUNT(DISTINCT CASE WHEN likes.like_status = '0' THEN likes.student_id END) AS like_count,
         COUNT(DISTINCT CASE WHEN likes.like_status = '1' THEN likes.student_id END) AS dislike_count 
    FROM blog 
    LEFT JOIN likes ON blog.id =likes.blog_id
    WHERE blog.id=?
    `;
    const values = [blog_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Retrieve the blog for blog_id ==>${blog_id}`;

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
  GetBlogById
};
