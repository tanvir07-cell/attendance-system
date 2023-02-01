// service folder er moddeh alltime business logic likha lage:
// ar req,res niye kaaj korbe amar controller:

// ar ei pattern ti eivabe chole (Model->Routes->Controller->Service)

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./userService");
const { error } = require("../utils/error");

module.exports.registerService = async ({ name, email, password }) => {
  // let user = await User.findOne({ email });
  let user = await findUserByProperty(email);
  // jodi ei email diye user already register kora thake:
  if (user) {
    throw error("User already exists", 400);
  }
  // jodi user nah thake tahole create korte hobe ekhon:
  // user create korar age hash kore nibo bcryptjs use kore
  // user = new User({ name, email, password });
  const salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);

  // await user.save();
  return createNewUser({ name, email, password: hashPassword });
};

module.exports.loginService = async ({ email, password }) => {
  // jodi user email and password diye login korar try kore:
  const user = await findUserByProperty(email);
  // ekhon jodi user tike nah paoaa jay tar mane e holo user ti ei email e kono account ei khule nih:
  if (!user) {
    throw error("Please create account before login", 400);
  }
  // ekhon jodi user tike paoaa jay:
  const checkPassword = bcrypt.compareSync(password, user.password);
  // jodi password ti vul hoy:
  if (!checkPassword) {
    const error = new Error("Invalid credentials");
    error.status = 400;
    throw error;
  }

  // jodi password all okkey thake tahole login korbe and login er pore ami ekti token dibo user ke jate kore pore user ke amra dore rakhte pari je ei user ti authentic user kina. ar ei token create korbo jwt diye:

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};
