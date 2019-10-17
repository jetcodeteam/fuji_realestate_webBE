const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    type: String,
    slug: String,
    name_with_type: String,
    path: String,
    path_with_type: String,
    code: {
      type: Number,
      unique: true,
      dropDups: true,
    },
    parent_code: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Districts', DistrictSchema);
