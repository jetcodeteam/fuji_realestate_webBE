const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const User = require('../apis/users/user');
const config = require('../config');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// authenticate user
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user || !user.verifyPassword(password))
          return done(null, false, 'Username or password is invalid');
        return done(null, user);
      });
    }
  )
);

// authorize token of user
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.SERCETKEY,
      ignoreExpiration: false,
    },
    async (payload, cb) => {
      try {
        const user = await User.findById(payload.id);
        if (!user) cb('User not found');
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);
