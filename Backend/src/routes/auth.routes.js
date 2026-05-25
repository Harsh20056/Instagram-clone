const express = require("express");
const {
  registerController,
  loginController,
  updatePasswordController,
  resetPasswordController,
  forgetPasswordController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forget-password", forgetPasswordController);
router.post(
  "/update-password/:userId",
  authMiddleware,
  updatePasswordController,
);
router.get("/reset-password/:token", resetPasswordController);

module.exports = router;
