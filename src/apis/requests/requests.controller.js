const router = require('express').Router();
const passport = require('passport');
const crud = require('../../utils/crud');

const Requests = require('./request');

const controllers = crud.crudControllers(Requests);

router
  .route('/')
  .post(
    passport.authenticate('jwt', { session: false }),
    controllers.createOne
  );

router
  .route('/:id')
  .get(controllers.getOne)
  .put(passport.authenticate('jwt', { session: false }), controllers.updateOne)
  .delete(
    passport.authenticate('jwt', { session: false }),
    controllers.removeOne
  );

router.route('/:page').get(controllers.getPage);

module.exports = router;
