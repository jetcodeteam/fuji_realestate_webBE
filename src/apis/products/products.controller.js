/* eslint-disable no-console */
const router = require('express').Router();
const passport = require('passport');

router.get('', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.send('Get all products');
});

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.status(201).send('Create a new product');
  }
);

router.get('/:id', (req, res) => {
  return res.send('Get one products');
});

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Update a product');
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Delete a product');
  }
);

module.exports = router;
