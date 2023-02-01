module.exports.privateController = async (req, res) => {
  // ei req.user ti eseche authentication middleware theke:
  if (req.user) {
    res.status(200).json({
      message: "This is the private route",
    });
  }
};
