const router = require('express').Router();

router.get('', (req, res) => {
  return res.send('Get all products');
});

router.post('', (req, res) => {
  return res.send('Create a new product');
});

router.get('/:id', (req, res) => {
  return res.send('Get one products');
});

router.put('/:id', (req, res) => {
  return res.send('Update a product');
});

router.delete('/:id', (req, res) => {
  return res.send('Delete a product');
});

module.exports = router;
