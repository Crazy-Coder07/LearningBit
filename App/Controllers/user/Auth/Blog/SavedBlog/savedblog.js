"use strict";

const connection = require("../../../../../database/db");
const { returnServerRes } = require("../../../../../Helper");

async function IsBlogIdExists(req, res, next) {
  try {
    const blog_id = req.headers["x-blog-id"];

    const sql = `
       SELECT id
       FROM blog 
       WHERE id = ?
    `;

    const values = [blog_id];

    console.log("value of blog_id",blog_id)

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

async function AlreadySavedBlog(req, res, next) {
  try {
    const blog_id = req.headers["x-blog-id"];
    const user_id = req.user_id;

    const sql = `
       SELECT id
       FROM saved_blog
       WHERE blog_id = ? AND student_id = ? AND saved_status='1'
    `;

    const values = [blog_id, user_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if blog id exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          return returnServerRes(res, 409, false, "You Already Saved this blog");
        } else {
          return next();
        }
      }
    });
  } catch (error) {
    console.error("Error checking if blog id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function PostSaved(req, res, next) {
  try {
    const blog_id = req.headers["x-blog-id"];
    const user_id = req.user_id;

    const selectSql = `
       SELECT id, saved_status
       FROM saved_blog
       WHERE blog_id = ? AND student_id = ?
    `;

    const selectValues = [blog_id, user_id];

    connection.query(selectSql, selectValues, (error, results) => {
      if (error) {
        console.error("Error checking if saved exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          const likeStatus = results[0].saved_status;
          if (likeStatus === '0') {
            const updateSql = `
              UPDATE saved_blog
              SET saved_status = '1'
              WHERE id = ?
            `;
            const updateValues = [results[0].id];
            connection.query(updateSql, updateValues, (error, updateResults) => {
              if (error) {
                console.error("Error updating saved_status:", error);
                return returnServerRes(res, 500, false, "Internal server error");
              } else {
                const successMsg = `Again saved the blog for blog_id ==>${blog_id}`;
                return returnServerRes(res, 200, true, successMsg, updateResults);
              }
            });
          } else {
            return returnServerRes(res, 409, false, "You have already unsaved this Blog");
          }
        } else {
          const insertSql = `
            INSERT INTO saved_blog(blog_id, student_id, saved_status)
            VALUES(?, ?, '1')
          `;
          const insertValues = [blog_id, user_id];
          connection.query(insertSql, insertValues, (error, insertResults) => {
            if (error) {
              console.error("Error inserting saved blog data:", error);
              return returnServerRes(res, 500, false, "Internal server error");
            } else {
              const successMsg = `saved the blog for blog_id ==>${blog_id}`;
              return returnServerRes(res, 200, true, successMsg, insertResults);
            }
          });
        }
      }
    });
  } catch (error) {
    console.error("Error handling like operation:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  IsBlogIdExists,
  AlreadySavedBlog,
  PostSaved,
};
