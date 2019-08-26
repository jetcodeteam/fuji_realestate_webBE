/* eslint-disable camelcase */
const router = require('express').Router();
const passport = require('passport');

// routes api
const news = require('./news/news.module');
const users = require('./users/users.module');
const products = require('./products/products.module');
const customers = require('./customer_requests/customers.module');

/**
 * @swagger
 * components:
 *   schemas:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           format: IdObject
 *           example: 5d5fa766f54a623d45807adb
 *         title:
 *           type: string
 *           example: This is a news about house
 *         content:
 *           type: byte
 *     NewsPost:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           example: This is a news about house
 *         content:
 *           type: byte
 *   requestBodies:
 *     News:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsPost'
 *     description: Products object that needs to be added to the database
 */

// define routes
router.use('/users', users.controller);
router.use('/customer_requests', customers.controller);
router.use(
  '/news',
  passport.authenticate('jwt', { session: false }),
  news.controller
);
router.use(
  '/products',
  passport.authenticate('jwt', { session: false }),
  products.controller
);

module.exports = router;
