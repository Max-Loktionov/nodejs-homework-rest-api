const isConflict = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const validationUnique = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;

  if (err.status === 409) {
    const { status, keyValue } = err;
    res.status(status).json({
      status: "error",
      code: 409,
      message: `There was a duplicate keyValue ${
        keyValue.name || keyValue.phone
      }`,
    });
  } else {
    next();
  }

  next();
};

module.exports = validationUnique;
