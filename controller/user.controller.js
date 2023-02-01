const User = require("../models/User");

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(400).json({
        status: "false",
        message: "There is no user",
      });
    }
    return res.status(200).json({
      message: "User successfully retrieved",
      data: users,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};
