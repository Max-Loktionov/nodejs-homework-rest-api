const { User } = require("../../models/user");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    next(RequestError(404, `User not found`));
  }
  if (user.verify) {
    next(RequestError(400, "Verification has already been passed"));
  }

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);
  res.json({
    status: "success",
    code: 200,
    response: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendVerifyEmail;
