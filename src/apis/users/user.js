/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcryptjs = require('bcryptjs');
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
  this.hashpwd = bcryptjs.hashSync(pwd);
};

UserSchema.methods.verifyPassword = function(pwd) {
  return bcryptjs.compareSync(pwd, this.hashpwd);
};

UserSchema.methods.generateJWT = function() {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      role: this.role,
    },
    SERCETKEY,
    {
      expiresIn: '7d',
    }
  );
};

UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    role: this.role,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', UserSchema);
