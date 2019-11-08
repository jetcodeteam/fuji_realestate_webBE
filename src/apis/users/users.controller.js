/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
const router = require('express').Router();
const passport = require('passport');

const service = require('./user.service');

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (user) {
      const userAgent = req.headers['user-agent'];
      return res.status(200).json(user.toAuthJSON(userAgent));
    }
    return res.status(400).json({
      message: info,
    });
  })(req, res);
});

// eslint-disable-next-line consistent-return
router.post('/forgotpassword', (req, res) => {
  switch (req.query.action) {
    case 'password': {
      return passport.authenticate(
        'local',
        { session: false },
        async (err, user, info) => {
          try {
            if (user) {
              const { newPassword } = req.body;
              user.hashPassword(newPassword);
              const docs = await user.save();
              return res
                .status(200)
                .send({ message: 'Reset password successfully', user: docs });
            }
            return res.status(400).json({ message: info });
          } catch (error) {
            return res.status(500).json({ message: error });
          }
        }
      )(req, res);
    }
    case 'email': {
      const { email } = req.body;
      service.sendEmailForgotPassword(
        email,
        `${req.protocol}://${req.headers.host}/users/verify`
      );
      return res.status(200).send({ message: 'Send email successfully' });
    }
    default: {
      return res.status(404).json({
        message: 'Action not found',
      });
    }
  }
});

router.get(
  '/verify',
  passport.authenticate('email', { session: false }),
  (req, res) => {
    return res.status(200).json({
      username: req.user.username,
      token: req.query.code,
    });
  }
);

router.put(
  '/resetpassword',
  passport.authenticate('email', { session: false }),
  async (req, res, next) => {
    try {
      const { password } = req.body;
      if (!password)
        return res
          .status(400)
          .send({ message: 'Invalid password or missing password field' });
      const doc = await service.updatePasswordByEmail(req.user, password);
    } catch (err) {
      return next(err);
    }
    return res.status(200).send({ message: 'Change password successfully!' });
  }
);

module.exports = router;
