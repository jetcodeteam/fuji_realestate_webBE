const mongoose = require('mongoose');

const { Schema } = mongoose;

const RequestSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    content: { type: String, required: true },
    phone: String,
    email: {
      type: String,
      match: [
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim,
        'Invalid email address',
      ],
      required: true,
    },
    status: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Requests', RequestSchema);
