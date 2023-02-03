const AdminAttendance = require("../models/AdminAttendance");
const { error } = require("../utils/error");

module.exports.getEnable = async (req, res, next) => {
  try {
    const adminAttendanceStatus = await AdminAttendance.findOne({
      status: "RUNNING",
    });
    if (adminAttendanceStatus) {
      throw error("Already have status running", 400);
    }
    const adminAttendance = new AdminAttendance({});
    const attendance = await adminAttendance.save();
    return res.status(201).json({
      message: "Successfully created the attendace",
      attendance,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({
      status: "RUNNING",
    });
    if (!running) {
      throw error("Not running", 400);
    }

    return res.status(200).json(running);
  } catch (err) {
    next(err);
  }
};
