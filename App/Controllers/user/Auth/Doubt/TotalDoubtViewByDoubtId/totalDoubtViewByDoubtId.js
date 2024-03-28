"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");

async function IsDoubtIdExists(req, res, next) {
  try {
    const doubt_id = req.headers["x-doubt-id"];
   
    const sql = `
       SELECT id
       FROM ask_doubt 
       WHERE id = ?
    `;

    const values = [doubt_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if Doubt id exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          return next();
        } else {
          return returnServerRes(res, 404, false, "Doubt ID does not exist");
        }
      }
    });
  } catch (error) {
    console.error("Error checking if Doubt id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


async function UpdateViewsByDoubtId(req, res, next) {
  try {
    
    const doubt_id=req.headers["x-doubt-id"]
   
    const sql = `
        UPDATE ask_doubt
        SET view_count=view_count +1
        WHERE id=? 
    `;
    const values = [doubt_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `View Increases By 1 for doubt_id ==>${doubt_id}`;

        return returnServerRes(res, 200, true,successMsg,results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  IsDoubtIdExists,
  UpdateViewsByDoubtId
};
