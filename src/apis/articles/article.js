const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Articles', ArticleSchema);
