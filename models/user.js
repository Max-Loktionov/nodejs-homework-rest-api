const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleError } = require("../helpers");

const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}/;
const passwordMessage =
  "Passwords must contain: at least 1 lower case letter [a-z] and 1 upper case letter [A-Z] and 1 numeric character [0-9]. min length 8 characters.";

const userSchema = Schema(
  {
    password: {
      type: String,
      match: passwordRegex,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    avatarURL: {
      type: String,
      required: true,
    },
    token: { type: String, default: null },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleError);

const joiRegisterSchema = Joi.object({
  password: Joi.string()
    .trim()
    .regex(passwordRegex)
    .required()
    .messages({
      "string.empty": `password must contain value`,
      "string.pattern.base": `${passwordMessage}`,
    }),
  email: Joi.string().trim().regex(emailRegex).required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `email must contain value`,
    "string.pattern.base": `email must be xxx@xxx.yyy `,
  }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().trim().regex(emailRegex).required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `email must contain value`,
    "string.pattern.base": `email must be xxx@xxx.yyy `,
  }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
};
