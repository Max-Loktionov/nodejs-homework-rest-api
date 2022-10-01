const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  console.log(req.user);
  res.status(204).json();
};

module.exports = logout;
