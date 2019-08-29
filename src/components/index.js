/* eslint-disable camelcase */
const router = require('express').Router();
const passport = require('passport');
const uploadFile = require('../middlewares/multer');

// routes api
const articles = require('./articles/articles.module');
const users = require('./users/users.module');
const products = require('./products/products.module');
const requests = require('./requests/requests.module');
const uploads = require('./uploads/uploads.module');

// define routes
router.use('/users', uploadFile.none(), users.controller);
router.use('/requests', uploadFile.none(), requests.controller);
router.use('/uploads', uploads.controller);
router.use(
  '/articles',
  uploadFile.none(),
  passport.authenticate('jwt', { session: false }),
  articles.controller
);
router.use(
  '/products',
  passport.authenticate('jwt', { session: false }),
  products.controller
);

module.exports = router;
