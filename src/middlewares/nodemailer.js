const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.USERNAME_EMAIL,
    pass: config.PASSWORD_EMAIL,
  },
});
