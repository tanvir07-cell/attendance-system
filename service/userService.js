const User = require("../models/User");

module.exports.getAllUserService = () => {
  return User.find({});
};

module.exports.getUserByIdService = (userId) => {
  return User.findById(userId);
};

module.exports.findUserByProperty = (value) => {
  console.log(value);
  // if (value === "id") {
  //   return User.findById(value);
  // }
  return User.findOne({ email: value });
};

module.exports.createNewUser = ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  const user = new User({ name, email, password, roles, accountStatus });
  return user.save();
};

module.exports.updateUserByPUT = (id, userInfo) => {
  return User.findOneAndUpdate(
    { id },
    { ...userInfo },
    { runValidators: true, new: true }
  );
};
