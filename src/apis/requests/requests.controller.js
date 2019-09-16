import { crudControllers } from '../../utils/crud';

const router = require('express').Router();
const passport = require('passport');

const Requests = require('./request');

const controllers = crudControllers(Requests);

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controllers.getAll)
  .post(controllers.createOne);

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controllers.getOne)
  .put(passport.authenticate('jwt', { session: false }), controllers.updateOne)
  .delete(
    passport.authenticate('jwt', { session: false }),
    controllers.removeOne
  );

module.exports = router;
