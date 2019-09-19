const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [String],
    square: Number,
    floor: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    street: String,
    ward: String,
    district: String,
    city: String,
    status: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Products', ProductSchema);
