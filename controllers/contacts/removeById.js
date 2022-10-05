const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner });

  if (!result) {
    const error = new Error(`Contact with id:${id} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: "200",
    data: { result },
    message: "contact deleted",
  });
};
module.exports = removeById;
