const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    next(RequestError(409, `Email: ${email} in use`));
  }
  const newUser = new User({ email, subscription });

  newUser.setPassword(password);
  newUser.save();

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
