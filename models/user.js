const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Project_1")

const userSchema = mongoose.Schema({
  
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;