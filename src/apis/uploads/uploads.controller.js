/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const fs = require('fs');

const uploadFile = require('../../middlewares/multer');

router.post('', uploadFile.single('upload'), (req, res) => {
  res.status(200).json({
    filename: `${req.file.originalname}`,
    url: `${process.env.NODE_ENV !== 'production' ? req.protocol : 'https'}://${
      req.headers.host
    }/static/${req.file.filename}`,
  });
});

router.delete('', (req, res) => {
  const { path } = req.query;
  try {
    const image = path.split('/').slice(-1)[0];
    fs.unlink(`${__dirname}/../../../uploads/${image}`, e => {
      if (e) {
        if (e.code === 'ENOENT') {
          return res.status(404).json({
            message: 'image not found',
          });
        }
        return res.status(400).json({
          name: path,
          message: e,
        });
      }
      return res.status(200).json({
        message: 'Delete image successfully',
      });
    });
  } catch (error) {
    return res.status(500).json({
      name: path,
      message: error,
    });
  }
});

module.exports = router;
