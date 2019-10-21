const Products = require('./product');

const createOne = async (req, res) => {
  try {
    const {
      name,
      images,
      square,
      floor,
      feature,
      houseType,
      price,
      district,
      ward,
      address,
      city,
      status,
    } = req.body;
    const doc = await Products.create({
      name,
      images,
      square,
      floor,
      feature,
      houseType,
      price,
      district: JSON.parse(district),
      ward: JSON.parse(ward),
      address,
      city,
      status,
    });
    return res.status(201).json({ data: doc });
  } catch (e) {
    return res.status(400).json({ message: e });
  }
};

module.exports = {
  createOne,
};
