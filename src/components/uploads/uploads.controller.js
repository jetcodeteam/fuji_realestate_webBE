const passport = require('passport');
const router = require('express').Router();
const uploadFile = require('../../middlewares/multer');

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
  uploadFile.single('file'),
  (req, res) => {
    res.send({ path: req.file.path });
  }
);

module.exports = router;
