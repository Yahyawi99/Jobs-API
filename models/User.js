const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 10,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      `regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`,
      "please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});

module.exports = mongoose.model("User", UserSchema);
