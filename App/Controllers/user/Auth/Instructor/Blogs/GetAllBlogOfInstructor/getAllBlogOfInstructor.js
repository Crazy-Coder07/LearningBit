"use strict";

const connection = require("../../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../../Helper");


async function CreateBlogByInstructor(req, res, next) {
  try {
    
    
    const instructor_id=req.instructor_id;
    console.log(instructor_id);
   
    const sql = `
       SELECT 
             id AS blog_id,
             title AS blog_title,
             content AS blog_content,
             title_image,
             publication_date,
             views_count  
       FROM blog 
       WHERE instructor_id=?
       GROUP BY blog.id;
    `;

    const values = [instructor_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Retrieve all the list of the blog for instructor_id ==>${instructor_id}`;

        return returnServerRes(res, 200, true,successMsg,results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  CreateBlogByInstructor,
};
