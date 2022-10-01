const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id, email } = req.user;

  console.log("updateSub", _id);

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.json({ status: "success", code: "200", data: { email, subscription } });
};

module.exports = updateSubscription;
