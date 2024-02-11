const mongoose = require('mongoose');

// Define the schema for the Post model
const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the current date and time when a post is created
  },
  likes: {
    type: Array,
    default: []
  }
});

// Create the Post model using the schema
module.exports = mongoose.model('Post', postSchema);