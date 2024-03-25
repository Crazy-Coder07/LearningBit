"use strict";

const Joi = require("joi");
const { returnServerRes } = require("../../../../../Helper");

// Define the schema for user registration
const userRegisterSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty"
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
    "string.empty": "Email cannot be empty"
  }),
  phone: Joi.string().trim().min(10).max(25).required().pattern(/^\d+$/).messages({
    "any.required": "Phone number is required",
    "string.pattern.base": "Phone number must contain only numeric characters",
    "string.min": "Phone number must be at least {#limit} characters long",
    "string.max": "Phone number must be at most {#limit} characters long"
  }),
  address: Joi.string().trim().allow(null).required().max(255).messages({
    "string.max": "Address must be at most {#limit} characters long"
  }),
  alternate_phone: Joi.string().trim().allow(null).max(25).pattern(/^\d+$/).messages({
    "string.pattern.base": "Alternate phone number must contain only numeric characters",
    "string.max": "Alternate phone number must be at most {#limit} characters long"
  }),
  bio: Joi.string().trim().allow(null).max(255).messages({
    "string.max": "Bio must be at most {#limit} characters long"
  }),
  subjects: Joi.string().trim().allow(null).max(255).messages({
    "string.max": "Subjects must be at most {#limit} characters long"
  }),
  experience: Joi.string().trim().allow(null).max(255).messages({
    "string.max": "Experience must be at most {#limit} characters long"
  }),
  qualifications: Joi.string().trim().allow(null).max(255).messages({
    "string.max": "Qualifications must be at most {#limit} characters long"
  }),
});

// Middleware to handle Joi validation
const handelSchemaJoi = (req, res, next) => {
  try {
    const validation = userRegisterSchema.validate(req.body, { abortEarly: false });
    if (!validation.error) {
      return next();
    }
    const errorMsgs = validation.error.details.map(detail => detail.message.replace(/"/g, ""));
    res.status(400).json({
      success: false,
      msgs: errorMsgs
    });
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
};

// Middleware to handle Joi validation after sanitization
const handelSchemaJoi_AfterSanitize = (req, res, next) => {
  try {
    const validation = userRegisterSchema.validate(req.sanitizeBody_Data, { abortEarly: false });
    if (!validation.error) {
      return next();
    }
    const errorMsgs = validation.error.details.map(detail => detail.message.replace(/"/g, ""));
    return returnServerRes(res, 400, false, errorMsgs);
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
};

module.exports = { handelSchemaJoi, handelSchemaJoi_AfterSanitize };
