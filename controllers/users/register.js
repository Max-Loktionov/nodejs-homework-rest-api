const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    next(RequestError(409, `Email: ${email} in use`));
  }

  if (!password) {
    next(RequestError(400, `Password in body request undefined`));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashPassword });

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
