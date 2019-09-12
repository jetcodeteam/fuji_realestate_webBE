/* eslint-disable no-console */
const User = require('./user');
const mail = require('../../middlewares/nodemailer');
const { USERNAME_EMAIL: from } = require('../../config');

const sendEmailForgotPassword = (userEmail, urlVerifyPWD) => {
  User.findOne({ email: userEmail }, (err, user) => {
    if (err) return;
    const token = user.generateCodeForgotPWD();
    const mailOptions = {
      from,
      to: userEmail,
      subject: 'Forget Password',
      html: `<a href='${urlVerifyPWD}?code=${token}'>Change password</a>`,
    };
    mail.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      if (info) console.log(info);
    });
  });
};

const updatePasswordByEmail = (user, pwd) => {
  user.hashPassword(pwd);
  return user.save();
};

module.exports = {
  sendEmailForgotPassword,
  updatePasswordByEmail,
};
