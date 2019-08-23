const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  content: Buffer,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
