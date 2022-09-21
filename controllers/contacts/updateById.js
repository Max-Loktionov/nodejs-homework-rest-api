const contactsOperations = require("../../models/contacts");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.updateContactById(id, req.body);
  if (!result) {
    const error = new Error(`Contact with id:${id} not found`);
    error.status = 404;
    throw error;
  }
  res.json({ status: "success", code: "200", data: { result } });
};
module.exports = updateById;
