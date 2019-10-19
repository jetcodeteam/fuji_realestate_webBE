const mongoose = require('mongoose');

const WardSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: String,
    type: String,
    slug: String,
    name_with_type: String,
    path: String,
    path_with_type: String,
    code: { type: Number, unique: true, dropDups: true },
    parent_code: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Wards', WardSchema);