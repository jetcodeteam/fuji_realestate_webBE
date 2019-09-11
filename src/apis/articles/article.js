const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: Buffer,
  thumbnail: Buffer,
  option: {
    timestamp: true,
  },
});

module.exports = mongoose.model('Articles', ArticleSchema);
