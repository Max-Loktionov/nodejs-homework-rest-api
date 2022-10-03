const { Contact } = require("../../models");
const RequestError = require("../../helpers/RequestError");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOne({ _id: id, owner: _id });

  if (!result) {
    throw RequestError(404, `Contact with id:${id} not found`);
  }

  res.json({ status: "success", code: "200", data: { result } });
};

module.exports = getById;
