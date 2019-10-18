const passport = require('passport');
const router = require('express').Router();
const crud = require('../../utils/crud');
const Districts = require('./district');
const authorizeAgent = require('../../middlewares/authorizeAgent');

const controllers = crud.crudControllers(Districts);

router
  .route('')
  .get(
    passport.authenticate('jwt', { session: false }),
    authorizeAgent,
    controllers.getPage
  );

module.exports = router;
