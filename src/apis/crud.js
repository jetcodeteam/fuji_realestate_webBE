/* eslint-disable no-console */
const fs = require('fs');

const logger = require('../middlewares/errorlog');

const getOne = (model, populate) => async (req, res) => {
  try {
    let doc = model.findOne({ _id: req.params.id });

    if (populate) {
      populate.forEach(item => doc.populate(item));
    }
    doc = await doc.lean().exec();
    if (!doc) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    return res.status(200).json({ data: doc });
  } catch (e) {
    logger(`get ${model.collection.collectionName}`, e);
    return res.status(400).json({ message: e });
  }
};

const getPage = (model, populate) => async (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const sort = req.query.sort || 'createdAt';
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  let order = req.query.order || 'DESC';
  try {
    order = order.toLowerCase();
    const total = await model
      .find(filter)
      .lean()
      .countDocuments()
      .exec();

    let docs = model
      .find(filter)
      .lean()
      .sort({ [sort]: order })
      .limit(Number(limit))
      .skip(Number(offset));
    if (populate) {
      populate.forEach(item => docs.populate(item));
    }
    docs = await docs.exec();
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Content-Range', `${offset}-${limit}/${total}`);
    res.status(200).json({ data: docs });
  } catch (e) {
    logger(`get pagination ${model.collection.collectionName}`, e);
    res.status(400).json({ message: e });
  }
};

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    return res.status(201).json({ data: doc });
  } catch (e) {
    logger(`create ${model.collection.collectionName}`, e);
    return res.status(400).json({ message: 'Bad request' });
  }
};

const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }

    return res.status(200).json({ data: updatedDoc });
  } catch (e) {
    logger(`update ${model.collection.collectionName}`, e);
    return res.status(400).json({ message: 'Request not found' });
  }
};

const deleteImage = path => {
  fs.unlink(`${__dirname}/../../uploads/${path}`, e => {
    if (e) logger('delete image', e);
  });
};

const removeOne = model => async (req, res) => {
  try {
    switch (model.collection.collectionName.toLowerCase()) {
      case 'products': {
        const doc = await model.findOne({
          _id: req.params.id,
        });
        doc.images.forEach(value => {
          const image = value.url.split('/').slice(-1)[0];
          deleteImage(image);
        });
        break;
      }
      case 'articles': {
        const doc = await model.findOne({
          _id: req.params.id,
        });
        deleteImage(doc.thumbnail);
        break;
      }
      default:
        break;
    }
    const removed = await model.findOneAndRemove({
      _id: req.params.id,
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    logger(`remove ${model.collection.collectionName}`, e);
    return res.status(400).json({ message: 'Invalid ID supplied' });
  }
};

const crudControllers = (model, populate) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getPage: getPage(model, populate),
  getOne: getOne(model, populate),
  createOne: createOne(model),
});

module.exports = {
  crudControllers,
};
