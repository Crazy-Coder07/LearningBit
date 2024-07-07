"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");


async function GetAllBlogs(req, res, next) {
  try {
    
    const sql = `
       SELECT 
             blog.id AS blog_id,
             blog.instructor_id AS  blog_instructor_id,
             instructor.name AS instructor_name,
             instructor.email AS instructor_email,
             blog.title AS blog_title,
             blog.content AS blog_content,
             blog.title_image,
             blog.publication_date,
             blog.views_count,
             COUNT(DISTINCT likes.id) AS like_count
       FROM blog 
       LEFT JOIN instructor ON blog.instructor_id=instructor.id
       LEFT JOIN likes ON blog.id=likes.blog_id AND likes.like_status='0'
       GROUP BY blog.id;
    `;

    const values = [];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Retrieve all the list of the blog`;

        return returnServerRes(res, 200, true,successMsg,results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  GetAllBlogs,
};
