const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    response: {
      user: {
        email: email,
        subscription: subscription,
      },
    },
  });
};

module.exports = getCurrent;
