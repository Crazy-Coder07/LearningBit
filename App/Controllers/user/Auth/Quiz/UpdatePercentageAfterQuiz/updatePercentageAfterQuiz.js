"use strict";

const connection = require("../../../../../database/db");
const { sanitizeString, returnServerRes } = require("../../../../../Helper");

async function sanitizeBody(req, res, next) {
  try {
    const {
      percentage_score
    } = req.body;

    req.sanitizeBody_Data = {
      percentage_score: sanitizeString(percentage_score)
    };

    return next();
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

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
          return returnServerRes(res, 404, false, "Blog ID does not exist");
        }
      }
    });
  } catch (error) {
    console.error("Error checking if blog id exists:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

// async function AlreadyEnrolledTheQuiz(req, res, next) {
//   try {
//     const quiz_id = req.headers["x-quiz-id"];
//     const user_id=req.user_id;
   
//     const sql = `
//        SELECT percentage_score
//        FROM quiz_enrolled
//        WHERE quiz_id = ? AND student_id = ? 
//     `;

//     const values = [quiz_id,user_id];

//     connection.query(sql, values, (error, results) => {
//       if (error) {
//         console.error("Error checking if blog id exists:", error);
//         return returnServerRes(res, 500, false, "Internal server error");
//       } else {
//         if (results.length > 0) {
//           return returnServerRes(res, 200, true, "You Already Inrolled This Quiz",results);
//         } else {
//           return next();
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Error checking if blog id exists:", error);
//     return returnServerRes(res, 500, false, "Internal server error");
//   }
// }

async function IpdateThePercentageForEnrollment(req, res, next) {
  try {
    const quiz_id = req.headers["x-quiz-id"];
    const user_id = req.user_id;
    const {
      percentage_score
    }=req.sanitizeBody_Data;

    const insertSql = `
      UPDATE quiz_enrolled
      SET percentage_score=?
      WHERE quiz_id=? AND student_id=?
    `;
    const values = [percentage_score,quiz_id, user_id];
    
    connection.query(insertSql, values, (error, results) => {
      if (error) {
        console.error("Error inserting like data:", error);
        return returnServerRes(res, 500, false, "Internal server error");
      } else {
        const successMsg = `Updated the Percentage_Score quiz_id ==> ${quiz_id}`;
        return returnServerRes(res, 200, true, successMsg, results);
      }
    });
  } catch (error) {
    console.error("Error in PostLikes controller:", error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = {
  sanitizeBody,
  IsQuizIdExists,
  // AlreadyEnrolledTheQuiz,
  IpdateThePercentageForEnrollment
};
