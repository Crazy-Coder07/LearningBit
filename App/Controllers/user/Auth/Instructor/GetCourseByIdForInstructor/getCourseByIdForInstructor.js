"use strict";

const connection = require("../../../../../database/db");
const { queryAsync, returnServerRes } = require("../../../../../Helper");

async function checkIfCourseAreValidOrNot(req, res, next) {
    try {
      const course_id = req.headers["x-course-id"];
  
      const userQuery = `
         SELECT id
         FROM course
         WHERE id = ?
      `;
  
      const value = [course_id];
  
      connection.query(userQuery, value, (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return returnServerRes(res, 500, false, "Internal server error");
        }
        if (results.length == 0) {
          return returnServerRes(res, 404, false, "This Course Are Not Available");
        }
        return next();
      });
    } catch (error) {
      console.log(error); 
      return returnServerRes(res, 500, false, "Internal server error");
    }
}
  
async function GetCourseByIdForInstructor(req, res, next) {
  try {
   
    const instructor_id=req.instructor_id;
    const course_id = req.headers["x-course-id"];
    
    const getuserdataQuery = `
       SELECT *
       FROM course
       WHERE instructor_id=? AND id=?
    `;
    const value = [instructor_id,course_id];
    
    await connection.query(getuserdataQuery, value,(err,results)=>{
        if (err) {
            console.error("Error executing query:", err);
            return returnServerRes(res, 500, false, "Internal server error");
          }
        if(results.length==0){
            return returnServerRes(res,404,false, "no data found for this user");
        }
      
      const successMsg = `Course data retrieved successfully for instructor_id: ${instructor_id} and course_id: ${course_id}`;

      return returnServerRes(res,200,true,successMsg,results)
    })
  } catch (error) {
    console.log(error); 
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = { 
  checkIfCourseAreValidOrNot,
  GetCourseByIdForInstructor, 
};
