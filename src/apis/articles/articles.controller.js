const passport = require('passport');
const router = require('express').Router();

router.get('', (req, res) => {
  return res.send('Get all articles');
});

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Create a new article');
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Get one article');
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Update a article');
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Delete a article');
  }
);

module.exports = router;
