const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}/;
const passwordMessage =
  "Passwords must contain: а minimum of 1 lower case letter [a-z] and a minimum of 1 upper case letter [A-Z] and a minimum of 1 numeric character [0-9], and min length 8 characters.";

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
    token: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

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
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiSubscriptionSchema,
};
