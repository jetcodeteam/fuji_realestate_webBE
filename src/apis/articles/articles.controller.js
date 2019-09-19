const router = require('express').Router();
const crud = require('../../utils/crud');
const Articles = require('./article');

const controllers = crud.crudControllers(Articles);

router
  .route('')
  .get(controllers.getAll)
  .post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

module.exports = router;
