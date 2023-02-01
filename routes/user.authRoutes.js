const router = require("express").Router();
const userAuthController = require("../controller/user.authController");

router
  .post("/register", userAuthController.register)
  .post("/login", userAuthController.login);

module.exports = router;
