const express = require("express");

const router = express.Router();

const { validation, auth, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const {
  joiRegisterSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
} = require("../../models/user");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(joiVerifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post("/login", validation(joiRegisterSchema), ctrlWrapper(ctrl.login));

router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
