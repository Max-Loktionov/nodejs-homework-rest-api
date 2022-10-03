const { Contact } = require("../../models");

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;

  console.log("updateFavorite owner", _id);

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
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
