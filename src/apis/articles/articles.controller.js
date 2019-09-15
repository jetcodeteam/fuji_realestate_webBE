import { crudControllers } from '../../utils/crud';

const router = require('express').Router();
const Articles = require('./article');

const controllers = crudControllers(Articles);

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
