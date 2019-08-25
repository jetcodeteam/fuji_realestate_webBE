const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  imgPath: String,
  pending: Boolean,
  option: {
    timestamp: true,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
