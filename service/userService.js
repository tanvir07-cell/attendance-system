const User = require("../models/User");

module.exports.findUserByProperty = (value) => {
  console.log(value);
  //   if (value === "_id") {
  //     return User.findById(value);
  //   }
  return User.findOne({ email: value });
};

module.exports.createNewUser = ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return user.save();
};
