const { Contact } = require("../../models");
const RequestError = require("../../helpers/RequestError");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(404, `Contact with id:${id} not found`);
  }

  res.json({ status: "success", code: "200", data: { result } });
};

module.exports = getById;
