"use strict";

const connection = require("../../../../../database/db");
const { queryAsync, returnServerRes } = require("../../../../../Helper");

  
async function getParticularInstructorAllCourseData(req, res, next) {
  try {
   
    const instructor_id=req.instructor_id;

    const getuserdataQuery = `
       SELECT *
       FROM course
       WHERE instructor_id=?
       GROUP BY course.id;
    `;
    const value = [instructor_id];
    
    await connection.query(getuserdataQuery, value,(err,results)=>{
        if (err) {
            console.error("Error executing query:", err);
            return returnServerRes(res, 500, false, "Internal server error");
          }
        if(results.length==0){
            return returnServerRes(res,404,false, "no data found for this user");
        }
      
      const successMsg = `user Course data retrieved successfully for instructor_id: ${instructor_id}`;

      return returnServerRes(res,200,true,successMsg,results)
    })
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = { 
  getParticularInstructorAllCourseData, 
};
