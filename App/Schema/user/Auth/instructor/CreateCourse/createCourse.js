"use strict";

const Joi = require("joi");
const { returnServerRes } = require("../../../../../Helper");

const courseSchema = Joi.object({
  course_name: Joi.string().trim().required().messages({
    "any.required": "Course name is required",
    "string.empty": "Course name cannot be empty"
  }),
  description : Joi.string().trim().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty"
  }),
  duration: Joi.string().trim().required().messages({
    "any.required": "Duration is required",
    "string.empty": "Duration cannot be empty"
  }),
  level_status: Joi.string().trim().required().messages({
    "any.required": "Level status is required",
    "string.empty": "Level status cannot be empty"
  }),
  Price: Joi.number().required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number"
  }),
  course_fee_status: Joi.string().trim().required().messages({
    "any.required": "Course fee status is required",
    "string.empty": "Course fee status cannot be empty"
  }),
  prerequisites: Joi.string().trim().allow(null).max(255).messages({
    "string.max": "Prerequisites must be at most {#limit} characters long"
  }),
});

const handelSchemaJoi = (req, res, next) => {
  try {
    const validation = courseSchema.validate(req.body, { abortEarly: false });
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

const handelSchemaJoi_AfterSanitize = (req, res, next) => {
  try {
    const validation = courseSchema.validate(req.sanitizeBody_Data, { abortEarly: false });
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

module.exports = { 
  handelSchemaJoi, 
  handelSchemaJoi_AfterSanitize 
};
