/* eslint-disable no-console */
const passport = require('passport');
const router = require('express').Router();

const crud = require('../../utils/crud');
const Products = require('./product');
const authorizeAgent = require('../../middlewares/authorizeAgent');

const controllers = crud.crudControllers(Products);

router
  .route('')
  .get(controllers.getPage)
  .post(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.createOne
  );

router
  .route('/:id')
  .get(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.getOne
  )
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
