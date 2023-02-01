const User = require("../models/User");
const jwt = require("jsonwebtoken");
// verify the client token and server token:

module.exports.authentication = async (req, res, next) => {
  try {
    let clientToken = req.headers.authorization;
    if (!clientToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    // ekhon client er deoaa token er sathe server er generate kora token ke match kore dekhbo:
    // clientToken theke Bearer ti remove korbo:
    clientToken = clientToken.split(" ")[1];

    // decoded er maddome 2 ti token kei match koralam:
    const decoded = jwt.verify(clientToken, process.env.SECRET_KEY);

    // shudu token match korar porer abar user er id diyeo match koralam:
    const user = await User.findOne({ _id: decoded._id });

    // ekhon jodi match nah kore token gula:
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    // jei jei controller e ei authentication middleware ti use korbo oi oi controller jate token match korar pore user ti jate pay tai req.user = user set kore diyechi:
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
};
