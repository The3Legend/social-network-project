const mongoose = require("mongoose");
let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
});

module.exports = userSchema = mongoose.model("users", userSchema);
