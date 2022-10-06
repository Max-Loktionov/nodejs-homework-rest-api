const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    const error = new Error(`Contact with id:${id} not found`);
    error.status = 404;
    throw error;
  }
  res.json({ status: "success", code: "200", data: { result } });
};
module.exports = updateById;
