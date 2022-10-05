const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "",
    {
      skip,
      limit: limit,
    }
  )
    .sort({ name: 1 })
    .populate("owner", "_id email subscription createdAt");

  res.json({
    status: "success",
    code: "200",
    data: { result: contacts },
  });
};

module.exports = getAll;
