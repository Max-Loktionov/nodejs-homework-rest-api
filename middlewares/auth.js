const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      next(RequestError(401));
    }

    const { id } = jwt.verify(`${token}`, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(RequestError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      next(RequestError(401));
    }
  }
};

module.exports = auth;
