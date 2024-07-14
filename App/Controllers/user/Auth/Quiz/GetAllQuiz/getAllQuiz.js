"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");


async function GetAllQuiz(req, res, next) {
  try {
    
    const sql = `
       SELECT 
             id AS quiz_id,
             instructor_id AS instructor_id,
             quiz_name AS quiz_name,
             instructions AS instructions,
             created_at AS quiz_releasing_time
       FROM quizes 
       GROUP BY quizes.id;
    `;

    const values = [];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Retrieve all the Quiz List`;

        return returnServerRes(res, 200, true,successMsg,results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  GetAllQuiz,
};
