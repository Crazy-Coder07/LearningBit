"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");

async function IsQuizIdExists(req, res, next) {
  try {
    const quiz_id = req.headers["x-quiz-id"];
   
    const sql = `
       SELECT id
       FROM quizes
       WHERE id = ?
    `;

    const values = [quiz_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error checking if blog id exists:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.length > 0) {
          return next();
        } else {
          return returnServerRes(res, 404, false, "Quiz ID does not exist");
        }
      }
    });
  } catch (error) {
    console.error("Error checking if blog id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


async function GetQuizById(req, res, next) {
  try {
    
    const quiz_id=req.headers["x-quiz-id"]
   
    const sql = `
    SELECT 
         quizes.id AS quiz_id,
         quizes.quiz_name AS quiz_name,
         quizes.instructions AS instructions,
         quizes.created_at AS created_at,
         quiz_duration.hours AS quiz_hour,
         quiz_duration.minutes AS quiz_minutes,
         quiz_duration.seconds AS quiz_second,
         quiz_questions.id AS question_id,
         quiz_questions.question_name AS question_name,
         quiz_questions.answer AS answer,
         quiz_questions.marks AS question_marks,
         quiz_questions.explanation AS explanation,
         quiz_options.id as quiz_option_id,
         quiz_options.options as options
    FROM quizes
    LEFT JOIN quiz_questions ON quizes.id =quiz_questions.quiz_id
    LEFT JOIN quiz_options ON quiz_questions.id=quiz_options.question_id
    LEFT JOIN quiz_duration ON quizes.id=quiz_duration.quiz_id
    WHERE quizes.id=?
    GROUP BY quiz_questions.id;
    `;
    const values = [quiz_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Retrieve the blog for quiz_id ==>${quiz_id}`;

        return returnServerRes(res, 200, true,successMsg,results);
      }

    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = {
  IsQuizIdExists,
  GetQuizById
};
