const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      console.log("wrapper", "wrapper done before");
      await ctrl(req, res, next);
      console.log("wrapper", "wrapper done after");
    } catch (error) {
      console.log("wrapper", "wrapper done error");
      next(error);
    }
  };
};
module.exports = ctrlWrapper;
