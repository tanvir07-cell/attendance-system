const AdminAttendance = require("../models/AdminAttendance");
const { error } = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

module.exports.getEnable = async (req, res, next) => {
  try {
    const adminAttendanceStatus = await AdminAttendance.findOne({
      status: "RUNNING",
    });
    if (adminAttendanceStatus) {
      throw error("Already have status running", 400);
    }
    const adminAttendance = new AdminAttendance({ timeLimit: 1 });
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
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    // ekhon jodi jokhon amar attendance ti enable(create) kora hoise sei time jodi default(5min) er besi hoye jay tahole status="COMPLETED" hoye jabe
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }
    return res.status(200).json(running);
  } catch (err) {
    next(err);
  }
};

module.exports.getDisable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({
      status: "RUNNING",
    });
    if (!running) {
      throw error("Not running", 400);
    }

    running.status = "COMPLETED";

    return res.status(200).json(running);
  } catch (err) {
    next(err);
  }
};
