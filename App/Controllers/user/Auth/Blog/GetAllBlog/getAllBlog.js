"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");


async function GetAllBlogs(req, res, next) {
  try {
    
    const sql = `
       SELECT 
             id AS blog_id,
             title AS blog_title,
             content AS blog_content,
             title_image,
             publication_date,
             views_count  
       FROM blog 
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
