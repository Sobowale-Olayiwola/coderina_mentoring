const Joi = require("joi");

const createTodoSchema = Joi.object({
  description: Joi.string().required().label("description"),
  title: Joi.string().required().label("title"),
});

const updateTodoSchema = Joi.object({
  description: Joi.string().label("description"),
  title: Joi.string().required().label("title"),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
};
