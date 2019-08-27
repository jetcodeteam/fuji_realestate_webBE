/* eslint-disable no-console */
const router = require('express').Router();
const uploadFile = require('../../middlewares/multer');

router.get('', (req, res) => {
  return res.send('Get all products');
});

router.post('', uploadFile.array('images', 10), (req, res) => {
  console.log(req.files);
  console.dir(req.body.images);
  return res.status(201).send('Create a new product');
});

router.get('/:id', (req, res) => {
  return res.send('Get one products');
});

router.put('/:id', uploadFile.array('images', 10), (req, res) => {
  return res.send('Update a product');
});

router.delete('/:id', (req, res) => {
  return res.send('Delete a product');
});

module.exports = router;
