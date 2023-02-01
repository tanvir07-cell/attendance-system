const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();

app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/auth", require("./routes/user.authRoutes"));
app.use("/api/v1", require("./routes/user.private.route"));

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
