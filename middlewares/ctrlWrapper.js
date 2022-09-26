const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        next(error);
      } else {
        next();
      }
      next(error);
    }
  };
};
module.exports = ctrlWrapper;
