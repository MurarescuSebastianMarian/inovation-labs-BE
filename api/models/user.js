const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  varsta: {
    type: String,
    require: true,
  },
  universitate: {
    type: String,
    require: true,
  },
  facultate: {
    type: String,
    require: true,
  },
  specializare: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match:
      /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/,
  },
});

module.exports = mongoose.model("User", userSchema);
