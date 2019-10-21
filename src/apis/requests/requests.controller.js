const router = require('express').Router();
const passport = require('passport');

const crud = require('../../utils/crud');
const authorizeAgent = require('../../middlewares/authorizeAgent');
const Requests = require('./request');

const controllers = crud.crudControllers(Requests);

router
  .route('')
  .get(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.getPage
  )
  .post(controllers.createOne);

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
