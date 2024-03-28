"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");


async function sanitizeBody(req, res, next) {
  try {
    const {
      quiz_name,
      instructions
    } = req.body;

    req.sanitizeBody_Data = {
      quiz_name: sanitizeString(quiz_name),
      instructions: sanitizeString(instructions ),
    };

    return next();
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function saveTheQuizIntoDb(req, res, next) {
  try {

    const instructor_id=req.instructor_id;

    const { 
      quiz_name,
      instructions,
    } = req.sanitizeBody_Data;

    const sql = `
      INSERT INTO quizes (quiz_name,instructions,instructor_id)
      VALUES (?, ?, ?);
    `; 

    const values = [quiz_name,instructions,instructor_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving user registration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          req.quiz_id = results.insertId;
          return next();
        } else {
          const errorMsg = "Quiz Already Created Please try again";
          return returnServerRes(res, 500, false, errorMsg);
        }
      }
    });
  } catch (error) {
    console.error("Error saving user registration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function saveTheQuizDurationIntoDb(req, res, next) {
  try {
    const quiz_id = req.quiz_id;

    const { duration } = req.body;

    console.log(duration);

    const { hours, minutes, seconds } = duration;
    console.log(hours,minutes,seconds);

    const sql = `
      INSERT INTO quiz_duration (hours, minutes, seconds, quiz_id)
      VALUES (?, ?, ?, ?);
    `;

    const values = [hours, minutes, seconds, quiz_id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error saving quiz duration data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        if (results.affectedRows > 0) {
          return next();
        } else {
          const errorMsg = "Quiz duration already created. Please try again.";
          return returnServerRes(res, 500, false, errorMsg);
        }
      }
    });
  } catch (error) {
    console.error("Error saving quiz duration data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


async function saveTheQuizQuestionAnswer(req, res, next) {
  try {
    const quiz_id = req.quiz_id;
    const { question_details } = req.body;
    var question_id;

    await Promise.all(question_details.map(async (question) => {
      const { question_name, answer, explanation,options} = question;

      const sql = `
        INSERT INTO quiz_questions(question_name, answer, explanation, quiz_id)
        VALUES (?, ?, ?, ?);
      `;
      const values = [question_name, answer, explanation, quiz_id];

      await new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
          if (error) {
            console.error("Error saving question details:", error);
            reject(error);
          } else {
            if (results.affectedRows > 0) {
               question_id = results.insertId; 
              resolve();
            } else {
              reject("Failed to insert question details");
            }
          }
        });
      });


      const optionsSql = `
        INSERT INTO quiz_options(question_id, options)
        VALUES (?, ?);
      `;

      const values1 = [question_id,JSON.stringify(options)];

      await new Promise((resolve, reject) => {
        connection.query(optionsSql, values1, (error, results) => {
          if (error) {
            console.error("Error saving options:", error);
            reject(error);
          } else {
            if (results.affectedRows > 0) {
              resolve();
            } else {
              reject("Failed to insert options");
            }
          }
        });
      });

    }));

    next();

  } catch (error) {
    console.error("Error saving quiz question and answer data:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


async function sendSuccessMsg(req, res, next) {
  try {
    const successMsg = "Quiz Created Successfully";

    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  saveTheQuizIntoDb,
  saveTheQuizDurationIntoDb,
  saveTheQuizQuestionAnswer,
  sendSuccessMsg,
};
