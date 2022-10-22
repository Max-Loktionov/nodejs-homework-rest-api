const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    next(RequestError(404, `User not found`));
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    status: "success",
    code: 200,
    response: {
      message: "Verification successful",
    },
  });
};

module.exports = verifyEmail;
