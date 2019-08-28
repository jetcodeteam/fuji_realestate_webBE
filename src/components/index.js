const router = require('express').Router();

// routes api
const articles = require('./articles/articles.module');
const users = require('./users/users.module');
const products = require('./products/products.module');
const contacts = require('./requests/requests.module');

// define routes
router.use('/articles', articles.controller);
router.use('/users', users.controller);
router.use('/products', products.controller);
router.use('/contacts', contacts.controller);

module.exports = router;
