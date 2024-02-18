"use strict";

const Joi = require("joi");
const { returnServerRes } = require("../../../Helper");

const userRegisterSchema = Joi.object({
  name: Joi
    .string()
    .trim()
    .required()
    .messages({"any.required": "Name is required","string.empty": "Name cannot be empty"}),
  email: Joi
    .string()
    .trim()
    .email()
    .required()
    .messages({"any.required": "Email is required","string.email": "Invalid email format","string.empty": "Email cannot be empty"}),
  phone: Joi
    .string()
    .trim()
    .min(10)
    .max(25)
    .required()
    .pattern(/^\d+$/)
    .messages({
    "any.required": "Phone number is required",
    "string.pattern.base": "Phone number must contain only numeric characters",
    "string.min": "Phone number must be at least {#limit} characters long",
    "string.max": "Phone number must be at most {#limit} characters long",
  }),
  address: Joi
  .string()
  .trim()
  .allow(null)
  .required()
  .max(255)
  .messages({
    "string.max": "Address must be at most {#limit} characters long",
  }),
  password: Joi
    .string()
    .trim()
    .required()
    .messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
  // photo: Joi.string().trim().uri().allow(null).messages({
  //   "string.uri": "Photo must be a valid URI"
  // })
});

const handelSchemaJoi = (req, res, next) => {
    try {
      if (!userRegisterSchema.validate(req.body)?.error?.message) {
        return next();
      }
      res.status(400).json({
        success: false,
        msg: userRegisterSchema.validate(req.body)?.error?.message.replace(/"/g, ""),
      });
    } catch (error) {
      console.log(error); 
      return returnServerRes(res, 500, false, "Internal server error");
    }
  };

const handelSchemaJoi_AfterSanitize = (req, res, next) => {
    try {
      if (!userRegisterSchema.validate(req.sanitizeBody_Data)?.error?.message) {
        return next();
      }
      const serverMsg = userRegisterSchema.validate(
        req.sanitizeBody_Data
      )?.error?.message.replace(/"/g, "");
      return returnServerRes(res, 400, false, serverMsg);
    } catch (error) {
      console.log(error); // Log the error
      return returnServerRes(res, 500, false, "Internal server error");
    }
  };

module.exports = { handelSchemaJoi, handelSchemaJoi_AfterSanitize};
