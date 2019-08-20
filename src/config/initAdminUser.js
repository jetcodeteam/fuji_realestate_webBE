/* eslint-disable no-console */
const User = require('../components/users/user');

const seedData = (username, email, pwd) => {
  console.log('🎉 Seeding data...');
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    if (!user) {
      const admin = new User({
        username,
        email,
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
  });
};

seedData(
  process.env.USERNAME_ADMIN || 'admin',
  process.env.EMAIL_ADMIN || 'example@gmail.com',
  process.env.PASSWORD_ADMIN || '123456789'
);
