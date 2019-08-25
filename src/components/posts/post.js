const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  content: Buffer,
  option: {
    timestamp: true,
  },
});

module.exports = mongoose.model('Post', PostSchema);
