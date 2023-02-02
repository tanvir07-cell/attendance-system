const User = require("../models/User");
const userAuthService = require("../service/authService");
const userService = require("../service/userService");
const { error } = require("../utils/error");

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUserService();
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
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserByIdService(id);

    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json({
      status: "true",
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.PostUser = async (req, res, next) => {
  try {
    const user = await userAuthService.registerService(req.body);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserByIdService(req.params.id);
    if (!user) {
      throw error("User not found", 404);
    }
    // delete the found user:
    await user.remove();
    return res.status(203).send();
  } catch (err) {
    next(err);
  }
};

module.exports.patchUserById = async (req, res, next) => {
  try {
    const { name, roles, accountStatus } = req.body;
    const user = await userService.getUserByIdService(req.params.id);
    if (!user) {
      throw error("User not found", 404);
    }
    // update the user information and check validity:
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    await user.save();
    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.putUserById = async (req, res, next) => {
  try {
    const { name, roles, accountStatus, email } = req.body;
    // jei id er data update korte chai sei id er email ti ei jodi abar updated user er email hoy tahole error dibe
    const user = await userService.findUserByProperty(email);
    if (user) {
      throw error("Email already in use", 404);
    }
    const updatedUser = await userService.updateUserByPUT(req.params.id, {
      name,
      roles,
      accountStatus,
      email,
    });
    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
