/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    // console.error(e);
    res.status(400).end();
  }
};

const getPage = model => async (req, res) => {
  const resPerPage = req.query.limit || 6;
  const page = req.params.page || 1;
  try {
    const docs = await model
      .find({})
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage)
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    // console.error(e);
    res.status(400).end();
  }
};

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    // console.error(e);
    res.status(400).end();
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
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    // console.error(e);
    res.status(400).end();
  }
};

const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      _id: req.params.id,
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    // console.error(e);
    res.status(400).end();
  }
};

const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getPage: getPage(model),
  getOne: getOne(model),
  createOne: createOne(model),
});

module.exports = {
  crudControllers,
};
