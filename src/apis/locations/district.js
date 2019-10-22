const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    slug: String,
    name_with_type: String,
    path: String,
    path_with_type: String,
    code: {
      type: String,
      unique: true,
      dropDups: true,
    },
    ward: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wards',
      },
    ],
    parent_code: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Districts', DistrictSchema);
