const passport = require('passport');
const router = require('express').Router();
const crud = require('../../utils/crud');
const Wards = require('./ward');
const authorizeAgent = require('../../middlewares/authorizeAgent');

const controllers = crud.crudControllers(Wards);

router
  .route('/:id')
  .get(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.getOne
  );

module.exports = router;
