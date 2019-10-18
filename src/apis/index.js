const router = require('express').Router();

// handle upload file from request with content-type: application/form-data
const uploadFile = require('../middlewares/multer');

// routes api
const articles = require('./articles/articles.module');
const users = require('./users/users.module');
const products = require('./products/products.module');
const requests = require('./requests/requests.module');
const districts = require('./locations/districts.module');
const wards = require('./locations/wards.module');
const uploads = require('./uploads/uploads.module');

// define routes
// support application/json or application/form-data
router.use('/users', uploadFile.none(), users.controller);
router.use('/requests', uploadFile.none(), requests.controller);
router.use('/products', uploadFile.none(), products.controller);
router.use('/districts', uploadFile.none(), districts.controller);
router.use('/wards', uploadFile.none(), wards.controller);
router.use('/uploads', uploadFile.single('upload'), uploads.controller);
router.use('/articles', uploadFile.none(), articles.controller);

module.exports = router;
