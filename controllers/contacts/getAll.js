const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = true || false } = req.query;
  const skip = (page - 1) * limit;
  const filter = req.query;
  console.log("filter getAll", filter);
  const contacts = await Contact.find({ owner: _id, filter }, "", {
    skip,
    limit: +limit,
  }).populate("owner", "_id email subscription createdAt");
  res.json({
    status: "success",
    code: "200",
    data: { result: contacts },
  });
};
module.exports = getAll;
