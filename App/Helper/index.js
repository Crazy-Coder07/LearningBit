"use strict";

const { JSDOM } = require("jsdom");  // create dom environment
const createDOMPurify = require("dompurify");   //Used for sanitizing HTML and preventing XSS attacks.
const useragent = require("express-useragent");  // Used for parsing user-agent strings to extract device and browser information
const fs = require("fs");

// Server ResPonse Format
const returnServerRes=(res, statusCode, success, message, data = {})=> {
  try {
    return res.status(statusCode).json({
      success,
      status:statusCode,
      message,
      data,
    });
  } catch (error) {
    console.error(error); 
  }
}

// Sanitize data
const sanitizeString=(data)=> {
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  const clean = DOMPurify.sanitize(data);
  return clean;
}

// Get user info
const getDeviceInfo=(req, res, next)=> {
  try {
    const {
      browser,
      version,
      platform,
      os,
      isMobile,
      isTablet,
      isiPad,
      isiPod,
    } = useragent.parse(req.headers["user-agent"]);

    req.deviceInfo = {
      browser: sanitizeString(browser),
      version: sanitizeString(version),
      platform: sanitizeString(platform),
      os: sanitizeString(os),
      more_Info: {
        isMobile: isMobile,
        isTablet: isTablet,
        isiPad: isiPad,
        isiPod: isiPod,
      },
    };
    return next();
  } catch (error) {
    console.error(error);
    return returnServerErrorMsg(res);
  }
}

// Generate otp
const generateOTP=(length)=> {
  const characters = "123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }

  return otp;
}

// Function to delete a file
const deleteFile=(filePath)=> {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log("File deleted successfully");
    }
  });
}

// Extracts data from an array of RowDataPacket objects.
function extractDataFromRowDataPackets(rows) {
  return rows.map((row) => ({ ...row }));
}

// format for query
const queryAsync=(connection, sql, values, res, errorMsg)=>{
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
        return returnServerRes(res, 500, false, errorMsg);
      } else {
        resolve(results);
      }
    });
  });
}

// Helper function
const validateQuery=(val, valTitle)=> {
  try {
    const payload = {
      msg: "",
      success: false,
      data: 1,
    };

    if (!val) {
      const errorMsg = `${valTitle} require in query.`;
      payload.msg = errorMsg;
      return payload;
    }

    const valTypeNumber = convertToNumber(val);

    if (!valTypeNumber.success) {
      payload.msg = valTypeNumber.msg;
      return payload;
    }

    payload.success = true;
    payload.data = valTypeNumber.number;
    return payload;
  } catch (error) {
    console.log(error); // Log error
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


const checkFileFormat=(formats, supportedFormats)=>{
  // Define the list of supported video formats
  // const supportedFormats = ["mp4"];
  const payload = {
    success: false,
    msg: "",
  };
  // Iterate through each format in the input array
  for (let format of formats) {
    // Extract the file extension from the format
    let extension = format.split(".").pop().toLowerCase();

    // Check if the extracted extension exists in the supported formats list
    if (!supportedFormats.includes(extension)) {
      // If the format is not supported, return an object with an error message
      payload.msg = `Unsupported video format: ${format}`;
      return payload;
    }
  }

  // If all formats are supported, return true
  payload.success = true;
  return payload;
}

module.exports = {
  returnServerRes,
  sanitizeString,
  getDeviceInfo,
  generateOTP,
  deleteFile,
  extractDataFromRowDataPackets,
  queryAsync,
  validateQuery,
  checkFileFormat,
};