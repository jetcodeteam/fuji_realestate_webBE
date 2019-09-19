/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
const router = require('express').Router();
const passport = require('passport');

const service = require('./user.service');

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (user) {
      return res.status(200).json(user.toAuthJSON());
    }
    return res.status(400).json({
      message: info,
    });
  })(req, res);
});

router.post('/forgotpassword', (req, res) => {
  const { email } = req.body;
  service.sendEmailForgotPassword(
    email,
    `${req.protocol}://${req.headers.host}/users/verify`
  );
  return res.status(200).send({ message: 'Send email successfully' });
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
      console.log(req.user)
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
