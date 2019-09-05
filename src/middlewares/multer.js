const multer = require('multer');
const path = require('path');

// handle application/form-data
const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${randomName}${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
