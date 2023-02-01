const mongoose = require("mongoose");

const app = require("./app");

const http = require("http");
const server = http.createServer(app);
const PORT = 4000;
mongoose
  .connect("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database Connected");
    server.listen(PORT, () => {
      console.log(`I am listenig on the port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
