const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  createdAt: Date,
  imgPath: String,
  pending: Boolean,
});

module.exports = mongoose.model('Product', ProductSchema);
