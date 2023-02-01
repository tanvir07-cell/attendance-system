const { registerService, loginService } = require("../service/authService");

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
    const user = await registerService({ name, email, password });
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    // return res.status(400).json({
    //   message: err.message,
    // });
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // user jodi email or password nah diye login korar try kore:
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide your credentials",
      });
    }
    // jodi email and password diye login korar try kore:
    const token = await loginService({ email, password });
    return res.status(200).json({
      status: true,
      token,
    });
  } catch (err) {
    next(err);
  }
};
