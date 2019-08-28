/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('../components/users/user');

const seedData = (username, pwd, role) => {
  console.log('🎉 Seeding data...');
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    if (!user) {
      const admin = new User({
        username,
        role,
      });
      admin.hashPassword(pwd);
      admin
        .save()
        .then(doc => console.log(`🎉 Data created ${doc}`))
        .catch(error => {
          console.log(error);
          process.exit(1);
        });
    } else console.log('🎉 Data already created');
    process.exit(0);
  });
};

// connecting mongodb
mongoose.connect(process.env.MONGODB_URI_JETCODE, {
  useNewUrlParser: true,
  autoIndex: false,
});
if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

seedData(
  process.env.USERNAME_ADMIN || 'admin',
  process.env.PASSWORD_ADMIN || '123456789',
  process.env.ROLE_ADMIN || 'test'
);
