const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    const { status = 400, keyValue } = err;
    res.status(status).json({
      status: "error",
      message: `There was a duplicate keyValue ${
        keyValue.name || keyValue.phone
      }`,
    });
  } else {
    next();
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
