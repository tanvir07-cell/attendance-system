const StudentAttendance = require("../models/StudentAttendance");
const AdminAttendance = require("../models/AdminAttendance");
const { error } = require("../utils/error");

module.exports.getStudentAttendance = async (req, res, next) => {
  try {
    // get which admin created this attendance:
    const adminAttendance = await AdminAttendance.findById(req.params.id);

    if (!adminAttendance) {
      throw error("Invalid Attendance ID", 400);
    }

    if (adminAttendance.status === "COMPLETED") {
      throw error("Attendance already completed");
    }
    let attendance = await StudentAttendance.findOne({
      adminAttendance: id,
      user: req.user._id,
    });

    if (attendance) {
      throw error("Already registered", 400);
    }

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    await attendance.save();
    return res.status(201).json(attendance);
  } catch (err) {
    next(err);
  }
};

module.exports.getStudentAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });

    if (!running) {
      throw error("Not Running", 400);
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};
