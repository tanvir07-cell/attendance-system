const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();

app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/auth", require("./routes/user.authRoutes"));
app.use("/api/v1", require("./routes/user.private.route"));

module.exports = app;
