const router = require('express').Router();
const passport = require('passport');

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

module.exports = router;
