const { model, Schema } = require("mongoose");

const studentAttendanceSchema = new Schema({
  createdAt: Date,

  //   kon student attendence dibe tar ekti id thakbe jate buja jay je pore oi id wala student ti attend chilo class e :
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  adminAttendance: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
  },
});

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);
module.exports = StudentAttendance;
