/* eslint-disable camelcase */
const router = require('express').Router();
const passport = require('passport');
const uploadFile = require('../middlewares/multer');

// routes api
const news = require('./news/news.module');
const users = require('./users/users.module');
const products = require('./products/products.module');
const customers = require('./customer_requests/customers.module');

// define routes
router.use('/users', uploadFile.none(), users.controller);
router.use('/customer_requests', uploadFile.none(), customers.controller);
router.use(
  '/news',
  uploadFile.none(),
  passport.authenticate('jwt', { session: false }),
  news.controller
);
router.use(
  '/products',
  // passport.authenticate('jwt', { session: false }),
  products.controller
);

module.exports = router;
