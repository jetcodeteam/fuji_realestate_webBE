const router = require('express').Router();
// const passport = require('passport');

router.post(
  '',
  // FIXME: unauthorized on development
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send({
      filename: `${req.file.filename}`,
      url: `${req.protocol}://${req.headers.host}/static/${req.file.filename}`,
    });
  }
);

module.exports = router;
