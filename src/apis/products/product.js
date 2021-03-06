const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [Object],
    square: Number,
    floor: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    room: Number,
    feature: [String],
    houseType: String,
    price: Number,
    address: String,
    ward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wards',
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Districts',
    },
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
