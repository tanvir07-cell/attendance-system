const router = require("express").Router();
const studentAttendanceController = require("../controller/studentAttendanceController");

router.get("/:id", studentAttendanceController.getStudentAttendance);
router.get("/status", studentAttendanceController.getStudentAttendanceStatus);

module.exports = router;
