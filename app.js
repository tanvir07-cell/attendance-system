const express = require("express");
const { authentication } = require("./middleware/authentication");
const app = express();

app.use(express.json());
require("dotenv").config();

app.use("/api/v1/users", authentication, require("./routes/user.routes"));
app.use("/api/v1/auth", require("./routes/user.authRoutes"));
app.use("/api/v1", require("./routes/user.private.route"));
// for admin attendance model routes:
app.use(
  "/api/v1/admin/attendance",
  authentication,
  require("./routes/adminAttendance.route")
);

// for student attendace model routes:
app.use(
  "/api/v1/student/attendance",
  authentication,
  require("./routes/studentAttendance.route")
);

// global error middleware:
app.use((err, req, res, next) => {
  console.log(err);
  err.message = err.message || "Server error";
  err.status = err.status || 400;

  return res.status(err.status).json({
    message: err.message,
  });
});

module.exports = app;
