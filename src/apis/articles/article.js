const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    decription: String,
    content: String,
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Articles', ArticleSchema);
