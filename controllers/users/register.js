const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const register = async (req, res, next) => {
  const sizeImgPx = 250;

  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email }, { s: sizeImgPx });
  if (user) {
    next(RequestError(409, `Email: ${email} in use`));
  }

  if (!password) {
    next(RequestError(400, `Password in body request undefined`));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = v4();
  await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = register;
