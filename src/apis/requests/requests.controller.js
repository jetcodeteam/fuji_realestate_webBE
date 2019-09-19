const router = require('express').Router();
const passport = require('passport');
const crud = require('../../utils/crud');

const Requests = require('./request');

const controllers = crud.crudControllers(Requests);

router.route('/').post(controllers.createOne);

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controllers.getOne)
  .put(passport.authenticate('jwt', { session: false }), controllers.updateOne)
  .delete(
    passport.authenticate('jwt', { session: false }),
    controllers.removeOne
  );

router
  .route('/:page')
  .get(passport.authenticate('jwt', { session: false }), controllers.getPage);

module.exports = router;
