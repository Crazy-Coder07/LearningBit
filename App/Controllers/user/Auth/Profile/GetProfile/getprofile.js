"use strict";

const connection = require("../../../../../database/db");
const { queryAsync, returnServerRes } = require("../../../../../Helper");

async function validateTokenAndUserid(req, res, next) {
    try {
      const user_id = req.user_id;
  
      const userQuery = `
         SELECT id
         FROM userregister
         WHERE id = ?
      `;
  
      const value = [user_id];
  
      connection.query(userQuery, value, (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return returnServerRes(res, 500, false, "Internal server error");
        }
        if (results.length == 0) {
          return returnServerRes(res, 404, false, "User not found");
        }

        return next();
      });
    } catch (error) {
      console.log(error); // Log error
      return returnServerRes(res, 500, false, "Internal server error");
    }
  }
  

async function getUserProfileData(req, res, next) {
  try {
   
    const user_id=req.user_id;

    const getuserdataQuery = `
    SELECT *
    FROM userregister
    WHERE id=?;
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
      
        const payload={
           userData:results[0],
        }
      const successMsg = `user data retrieved successfully for user_id: ${user_id}`;

      return returnServerRes(res,200,true,successMsg,payload)
    })
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function sendSuccessMsg(req, res) {
  try {
    const successMsg = `User Data Retrieve successfully.`;
    return returnServerRes(res, 200, true, successMsg);
  } catch (error) {
    console.log(error); // Log the error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = { validateTokenAndUserid, getUserProfileData, sendSuccessMsg };
