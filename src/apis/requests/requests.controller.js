const router = require('express').Router();
const passport = require('passport');

const crud = require('../../utils/crud');
const authorizeAgent = require('../../middlewares/authorizeAgent');
const Requests = require('./request');

const controllers = crud.crudControllers(Requests);

router
  .route('/')
  .post(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.createOne
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

router
  .route('/pages/:page')
  .get(passport.authenticate('jwt', { session: false }), controllers.getPage);

module.exports = router;
