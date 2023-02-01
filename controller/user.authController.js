const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // jodi user name,email,or password pass nah kore:
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }
    // jodi name,email and password pass kore:
    let user = await User.findOne({ email });
    // jodi ei email diye user already register kora thake:
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // jodi user nah thake tahole create korte hobe ekhon:
    // user create korar age hash kore nibo bcryptjs use kore
    user = new User({ name, email, password });
    const salt = await bcrypt.genSaltSync(10);
    var hashPassword = await bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    await user.save();
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // user jodi email or password nah diye login korar try kore:
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide your credentials",
      });
    }
    // jodi user email and password diye login korar try kore:
    const user = await User.findOne({ email });
    // ekhon jodi user tike nah paoaa jay tar mane e holo user ti ei email e kono account ei khule nih:
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Before login,please create your account",
      });
    }
    // ekhon jodi user tike paoaa jay:
    const checkPassword = bcrypt.compareSync(password, user.password);
    // jodi password ti vul hoy:
    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // jodi password all okkey thake tahole login korbe and login er pore ami ekti token dibo user ke jate kore pore user ke amra dore rakhte pari je ei user ti authentic user kina. ar ei token create korbo jwt diye:

    const token = jwt.sign(user._doc, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      status: true,
      token,
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};
