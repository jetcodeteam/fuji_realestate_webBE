// Check the ObjectId existence in reference fields before creating or updating a document.
const objectIdValidator = model => {
  return function validateObjectId(req, res, next) {
    let key = model.collection.collectionName;
    key = key.slice(0, key.length - 1); // Remove the last 's'

    const value = req.body[key];

    model.findOne({ _id: value }, (err, doc) => {
      if (err || !doc) {
        return res.status(400).json({ message: `${key} does not exist` });
      }
      return next();
    });
  };
};

module.exports = objectIdValidator;
