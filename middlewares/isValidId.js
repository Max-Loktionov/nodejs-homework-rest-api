const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(RequestError(404, `Wrong Id:${id}`));
  }
  next();
};

module.exports = isValidId;
