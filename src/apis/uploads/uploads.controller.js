const router = require('express').Router();
const uploadFile = require('../../middlewares/multer');

router.post('', uploadFile.single('upload'), (req, res) => {
  res.send({
    filename: `${req.file.filename}`,
    url: `${req.protocol}://${req.headers.host}/static/${req.file.filename}`,
  });
});

module.exports = router;
