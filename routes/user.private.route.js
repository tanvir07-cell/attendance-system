const router = require("express").Router();
const userPrivateController = require("../controller/user.private.controller");
const { authentication } = require("../middleware/authentication");

router.get("/private", authentication, userPrivateController.privateController);

module.exports = router;
