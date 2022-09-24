const { Contact } = require("../../models");

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    const error = new Error(`Contact with id:${id} not found`);
    error.status = 404;
    throw error;
  }
  res.json({ status: "success", code: "200", data: { result } });
};
module.exports = updateFavoriteById;
