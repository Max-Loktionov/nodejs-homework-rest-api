const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const phoneRegex = /\(?(\d{3})?\(?-?(\d{3})-?(\d{4})/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegex,
    },
    phone: {
      type: String,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const joiSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().regex(emailRegex).required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `email must contain value`,
    "string.pattern.base": `"" must be xxx@xxx.yyy `,
  }),
  phone: Joi.string().trim().regex(phoneRegex).required().messages({
    "string.empty": `phone must contain value`,
    "any.required": `phone is a required field`,
    "string.pattern.base": `"phone" must be 7 digit number (xxx)xxx-xxxx or xxx-xxx-xxxx`,
  }),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
