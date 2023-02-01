// Third party library use korte chaile all time require korte hoy:
const { model, Schema } = require("mongoose");
const validator = require("validator");

// creating a schema or a prototype:

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name is too short"],
    maxlength: [100, "Name is too long"],

    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password is too short"],
  },
  //   nicher roles ti hobe ekti array type tai [] use kora hoise karon user er ekadik role thakte pare like : admin,student
  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    required: true,
  },
});

// ami databse e data(user) pathonor age user thek password ti hide kore rekhechi.jate kore user password ti response send korar time e dekhte nah pare:

userSchema.methods.toJSON = function () {
  // json theke object e convert korlam:
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = model("User", userSchema);
// exporting this User.js file because we use this file in the different file also:
module.exports = User;
