/* eslint-disable no-console */
const router = require('express').Router();
const crud = require('../../utils/crud');
const Products = require('./product');

const controllers = crud.crudControllers(Products);

const uploadFile = require('../../middlewares/multer');

router.route('/').post(uploadFile.array('images', 10), controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(uploadFile.array('images', 10), controllers.updateOne)
  .delete(controllers.removeOne);

router.route('/:page').get(controllers.getPage);

module.exports = router;
