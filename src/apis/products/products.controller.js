/* eslint-disable no-console */
const passport = require('passport');
const router = require('express').Router();

const crud = require('../../utils/crud');
const Products = require('./product');
const authorizeAgent = require('../../middlewares/authorizeAgent');
const services = require('./products.service');

const controllers = crud.crudControllers(Products);

router
  .route('')
  .get(controllers.getPage)
  .post(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    services.createOne
  );

router
  .route('/:id')
  .get(controllers.getOne)
  .put(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.updateOne
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.removeOne
  );

module.exports = router;
