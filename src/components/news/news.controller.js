const router = require('express').Router();

router.get('', (req, res) => {
  return res.send('Get all news');
});

router.post('', (req, res) => {
  return res.send('Create a new news');
});

router.get('/:id', (req, res) => {
  return res.send('Get one news');
});

router.put('/:id', (req, res) => {
  return res.send('Update a news');
});

router.delete('/:id', (req, res) => {
  return res.send('Delete a news');
});

module.exports = router;
