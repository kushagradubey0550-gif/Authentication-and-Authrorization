const mongoose = require('mongoose');
const User = require('./user');

mongoose.connect("mongodb://127.0.0.1:27017/Project_1")

const postSchema =mongoose.Schema({
  title: String,
  content: String, 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
})

const post = mongoose.model("Post", postSchema);
module.exports = post;