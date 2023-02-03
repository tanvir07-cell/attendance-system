const { model, Schema } = require("mongoose");

const studentAttendanceSchema = new Schema(
  {
    //   kon student attendence dibe tar ekti id thakbe jate buja jay je pore oi id wala student ti attend chilo class e :
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // student ta kon admin(teacher)er create kora attendance dibe:
    // and ei admin er reference rakha hoyeche ref:"AdminAttendance" model tike

    adminAttendance: {
      type: Schema.Types.ObjectId,
      ref: "AdminAttendance",
      required: true,
    },
  },
  { timestamps: true }
);

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);
module.exports = StudentAttendance;
