"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");


async function GetAllDoubt(req, res, next) {
  try {
    
    const sql = `
       SELECT 
             id AS doubt_id,
             title AS doubt_title,
             Detail_Problems AS Detail_Problems,
             what_try_what_get AS what_try_what_get,
             got_error_image,
             postdate,
             view_count  
       FROM ask_doubt 
       GROUP BY ask_doubt.id;
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
  GetAllDoubt
};
