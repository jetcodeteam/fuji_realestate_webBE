const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  topic: String,
  content: Buffer,
  createdAt: { type: Date, default: Date.now },
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
  },
});

module.exports = mongoose.model('Request', RequestSchema);
