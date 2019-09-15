/* eslint-disable no-console */
import { crudControllers } from '../../utils/crud';

const router = require('express').Router();
const Products = require('./product');

const controllers = crudControllers(Products);

const uploadFile = require('../../middlewares/multer');

router
  .route('/')
  .get(controllers.getAll)
  .post(uploadFile.array('images', 10), controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(uploadFile.array('images', 10), controllers.updateOne)
  .delete(controllers.removeOne);

module.exports = router;
