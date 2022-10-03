const express = require("express");

const router = express.Router();

const { validation, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const {
  joiRegisterSchema,
  joiSubscriptionSchema,
} = require("../../models/user");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiRegisterSchema), ctrlWrapper(ctrl.login));

router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
