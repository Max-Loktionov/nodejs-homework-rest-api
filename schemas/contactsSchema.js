const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .regex(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)
    .required()
    .messages({
      "string.base": `email should be a type of string`,
      "string.empty": `email must contain value`,
      "string.pattern.base": `"" must be xxx@xxx.yyy `,
    }),
  phone: Joi.string()
    .trim()
    .regex(/\(?(\d{3})?\(?-?(\d{3})-?(\d{4})/)
    .required()
    .messages({
      "string.empty": `phone must contain value`,
      "any.required": `phone is a required field`,
      "string.pattern.base": `"phone" must be 7 digit number (xxx)xxx-xxxx or xxx-xxx-xxxx`,
    }),
});

module.exports = contactsSchema;
