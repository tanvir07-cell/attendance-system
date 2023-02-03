const router = require("express").Router();
const adminAttendanceController = require("../controller/adminAttendance.controller");

router.get("/enable", adminAttendanceController.getEnable);

router.get("/disable", () => {});

router.get("/status", adminAttendanceController.getStatus);

module.exports = router;
