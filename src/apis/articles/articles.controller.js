const router = require('express').Router();

router.get('', (req, res) => {
  return res.send('Get all articles');
});

router.post('', (req, res) => {
  return res.send('Create a new article');
});

router.get('/:id', (req, res) => {
  return res.send('Get one article');
});

router.put('/:id', (req, res) => {
  return res.send('Update a article');
});

router.delete('/:id', (req, res) => {
  return res.send('Delete a article');
});

module.exports = router;
