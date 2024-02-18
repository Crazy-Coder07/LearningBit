"use strict";

const jwt = require("jsonwebtoken");

const createJwtToken=async(data, setExpire, SIGNATURE)=> {
  const JWT_Token = jwt.sign(
    {
      data,
    },
    SIGNATURE,
    { expiresIn: setExpire }
  );
  return JWT_Token;
}

const verify_JWT=async(token, signature)=> {
  try {
    let jwtSuccess = false;
    let decoded = null;
    let data = {
      jwtSuccess,
      decoded,
    };

    const decodedToken = await jwt.verify(
      token,
      signature,
      function (err, decoded) {
        if (!err) {
          jwtSuccess = true;

          return (data = { jwtSuccess, decoded });
        }
        return (data = { jwtSuccess, decoded: err.message });
      }
    );
    return decodedToken;
  } catch (error) {
    console.error(error); 
    return error;
  }
}

module.exports = { createJwtToken, verify_JWT };