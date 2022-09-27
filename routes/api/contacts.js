const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { validation, isValidId } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
