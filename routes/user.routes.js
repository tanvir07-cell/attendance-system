const router = require("express").Router();
const userController = require("../controller/user.controller");

router
  .route("/:id")
  .get(userController.getUserById)
  .delete(userController.deleteUserById)
  .patch(userController.patchUserById);

router.route("/").get(userController.getAllUser).post(userController.PostUser);

module.exports = router;
