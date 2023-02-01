const { model, Schema } = require("mongoose");

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  //   eketi user er individual ekekti id thakbe and ei id ti asbe User.js theke eketi user create hoaar time e :
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const profile = model("Profile", profileSchema);
module.exports = Profile;
