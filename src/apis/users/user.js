/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SERCETKEY } = require('../../config');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      match: /^[a-zA-Z0-9]+$/,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      match: /\S+@\S+\.\S+/,
      index: true,
      unique: true,
    },
    hashpwd: String,
    role: {
      type: String,
      lowercase: true,
      required: true,
      match: /^[a-zA-Z0-9]+$/,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.hashPassword = function(pwd) {
  const salt = bcrypt.genSaltSync();
  this.hashpwd = bcrypt.hashSync(pwd, salt);
};

UserSchema.methods.verifyPassword = function(pwd) {
  return bcrypt.compareSync(pwd, this.hashpwd);
};

UserSchema.methods.generateCodeForgotPWD = function() {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      role: this.role,
      isEmail: true,
    },
    SERCETKEY,
    {
      expiresIn: '1d',
    }
  );
};

UserSchema.methods.toAuthJSON = function(userAgent) {
  return {
    username: this.username,
    role: this.role,
    token: jwt.sign(
      {
        id: this._id,
        username: this.username,
        role: this.role,
        agent: userAgent,
      },
      SERCETKEY,
      {
        expiresIn: '1d',
      }
    ),
  };
};

module.exports = mongoose.model('User', UserSchema);
