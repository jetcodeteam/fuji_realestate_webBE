const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    return res.status(200).json({ data: doc });
  } catch (e) {
    return res.status(400).json({ message: e });
  }
};

const getPage = model => async (req, res) => {
  const limit = req.query.limit || 6;
  const offset = req.query.offset || 0;
  const sort = req.query.sort || 'createdAt';
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  let order = req.query.order || 'DESC';
  try {
    order = order.toLowerCase();
    const total = await model.count();
    const docs = await model
      .find(filter)
      .sort({ [sort]: order })
      .limit(Number(limit))
      .skip(Number(offset))
      .lean()
      .exec();
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Content-Range', `${offset}-${limit}/${total}`);
    res.status(200).json({ data: docs });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    res.status(400).json({ message: e });
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
    return res.status(400).json({ message: 'Request not found' });
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
    return res.status(400).json({ message: 'Invalid ID supplied' });
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
