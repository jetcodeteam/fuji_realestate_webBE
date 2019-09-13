/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('../apis/users/user');

const seedData = async (username, email, pwd, role) => {
  console.log('🎉 Seeding data...');
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const admin = new User({
        username,
        email,
        role,
      });
      admin.hashPassword(pwd);
      const doc = await admin.save();
      console.log(`🎉 Data created ${doc.username}`);
    } else console.log('🎉 Data already created');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  process.exit(0);
};

// connecting mongodb
mongoose.connect(process.env.MONGODB_URI_JETCODE, {
  useNewUrlParser: true,
  autoIndex: false,
});
if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

seedData(
  process.env.USERNAME_ADMIN || 'admin',
  process.env.EMAIL_ADMIN || 'lqs9773@gmail.com',
  process.env.PASSWORD_ADMIN || '123456789',
  process.env.ROLE_ADMIN || 'test'
);
