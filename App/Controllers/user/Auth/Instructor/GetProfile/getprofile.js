"use strict";

const connection = require("../../../../../database/db");
const { queryAsync, returnServerRes } = require("../../../../../Helper");

  
async function getInstructorProfileData(req, res, next) {
  try {
   
    const user_id=req.user_id;
    const instructor_id=req.instructor_id;

    console.log("Hey this is the instructor id",instructor_id);

    const getuserdataQuery = `
    SELECT id,student_id,name,phone,email,address,alternate_phone,profile_photo,bio,subjects,experience,qualifications,Aadhar_Front,Aadhar_Back,Highest_Degree
    FROM instructor
    WHERE student_id=?;
    `;
    const value = [user_id];
    
    await connection.query(getuserdataQuery, value,(err,results)=>{
        if (err) {
            console.error("Error executing query:", err);
            return returnServerRes(res, 500, false, "Internal server error");
          }
        if(results.length==0){
            return returnServerRes(res,404,false, "no data found for this user");
        }
      
      const successMsg = `user data retrieved successfully for user_id: ${user_id}`;

      return returnServerRes(res,200,true,successMsg,results)
    })
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = { 
  getInstructorProfileData, 
};
