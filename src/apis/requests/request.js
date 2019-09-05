const mongoose = require('mongoose');

const { Schema } = mongoose;

const RequestSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  content: { type: String, required: true },
  phone: {
    type: String,
    match: [/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/gm, 'Invalid phone number'],
  },
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
  option: {
    timestamp: true,
  },
});

module.exports = mongoose.model('Requests', RequestSchema);
