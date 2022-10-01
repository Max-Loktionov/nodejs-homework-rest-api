const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"], // TODO: make regex
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
  password: Joi.string().trim().min(6).required().messages({
    "string.empty": `password must contain value`,
    "string.pattern.base": `"" must includes `, // TODO: make message for regex
  }),
  email: Joi.string().trim().regex(emailRegex).required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `email must contain value`,
    "string.pattern.base": `"" must be xxx@xxx.yyy `,
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
