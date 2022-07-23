const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().required().label("name"),
  email: Joi.string().email().required().label("email"),
  password: Joi.string().min(6).max(100).required().label("password"),
  phoneNumber: Joi.number().min(11).max(14).label("phoneNumber"),
});

const updateUserSchema = Joi.object({
  name: Joi.string().label("name"),
  email: Joi.string().email().label("email"),
  password: Joi.string().min(6).max(100).label("password"),
  phoneNumber: Joi.number().min(11).max(14).label("phoneNumber"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().label("email"),
  password: Joi.string().min(6).max(100).required().label("password"),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginSchema,
};
