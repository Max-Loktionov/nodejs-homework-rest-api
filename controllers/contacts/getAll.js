const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  console.log("getall", query);
  const contacts = await Contact.find({ owner, ...query }, "", {
    skip,
    limit: limit,
  })
    .sort({ name: 1 })
    .populate("owner", "_id email subscription createdAt");

  res.json({
    status: "success",
    code: "200",
    data: { result: contacts },
  });
};

module.exports = getAll;
