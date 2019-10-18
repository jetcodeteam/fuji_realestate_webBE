const passport = require('passport');
const router = require('express').Router();
const crud = require('../../utils/crud');
const Articles = require('./article');
const authorizeAgent = require('../../middlewares/authorizeAgent');

const controllers = crud.crudControllers(Articles);

router
  .route('')
  .get(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.getPage
  )
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
