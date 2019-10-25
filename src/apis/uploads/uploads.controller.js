const router = require('express').Router();
const passport = require('passport');

const authorizeAgent = require('../../middlewares/authorizeAgent');

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
  authorizeAgent,
  (req, res) => {
    res.send({
      filename: `${req.file.originalname}`,
      url: `${req.protocol}://${req.headers.host}/static/${req.file.filename}`,
    });
  }
);

module.exports = router;
