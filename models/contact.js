const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { checkUnique } = require("../helpers");

const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const phoneRegex = /\(?(\d{3})?\(?-?(\d{3})-?(\d{4})/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
      index: 1,
    },
    email: {
      type: String,
      match: emailRegex,
    },
    phone: {
      type: String,
      match: phoneRegex,
      unique: true,
      index: 2,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
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

contactSchema.post("save", checkUnique);

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
