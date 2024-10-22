const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: "String",
  userPassword: "String",
  userPhone: "Number",
},{versionKey: false});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
