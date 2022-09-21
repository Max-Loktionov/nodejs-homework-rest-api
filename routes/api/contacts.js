const express = require("express");
const Joi = require("joi");

const router = express.Router();
const contactsOperations = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");

const contactsSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .regex(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)
    .required()
    .messages({
      "string.base": `email should be a type of string`,
      "string.empty": `email must contain value`,
      "string.pattern.base": `"" must be xxx@xxx.yyy `,
    }),
  phone: Joi.string()
    .trim()
    .regex(/\(?(\d{3})?\(?-?(\d{3})-?(\d{4})/)
    .required()
    .messages({
      "string.empty": `phone must contain value`,
      "any.required": `phone is a required field`,
      "string.pattern.base": `"phone" must be 10 digit number (xxx)xxx-xxxx or xxx-xxx-xxxx`,
    }),
});

router.get("/", ctrl.getAll);

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      const error = new Error(`Contact with id:${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: "200", data: { result } });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({ status: "success", code: "201", data: { result } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      const error = new Error(`Contact with id:${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: "200",
      data: { result },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const result = await contactsOperations.updateContactById(id, req.body);
    if (!result) {
      const error = new Error(`Contact with id:${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: "200", data: { result } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
