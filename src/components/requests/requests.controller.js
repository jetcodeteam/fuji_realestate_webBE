const passport = require('passport');
const router = require('express').Router();

router.get('', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.send('Get all customer requests');
});

router.post('', (req, res) => {
  return res.send('Create a new customer requests');
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Get one customer requests');
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Update a customer requests');
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Delete a customer requests');
  }
);

module.exports = router;
