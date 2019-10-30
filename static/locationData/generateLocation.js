/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const mongoose = require('mongoose');
const District = require('../../src/apis/locations/district');
const Ward = require('../../src/apis/locations/ward');

mongoose.connect(process.env.MONGODB_URI_JETCODE, {
  useNewUrlParser: true,
  autoIndex: false,
  useUnifiedTopology: true,
});
if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

const createDistrict = districtInfo => {
  return new Promise(resolve => {
    const district = new District({
      _id: mongoose.Types.ObjectId(),
      ...districtInfo,
    });
    district.save(err => {
      if (err) console.log(err);
      resolve(district);
    });
  });
};

const createWard = async district => {
  const rawWards = fs.readFileSync(`${__dirname}/${district.code}.json`);
  const wards = JSON.parse(rawWards);
  for (let index = 0; index < wards.length; index += 1) {
    const wardInfo = wards[index];
    const ward = new Ward({
      _id: mongoose.Types.ObjectId(),
      ...wardInfo,
      district: district._id,
    });
    const newWard = await ward.save();
    district.ward.push(newWard);
  }
  await district.save();
};

// Main

const generateDistricWard = async () => {
  console.log('🎉 Generating districts & wards ...');
  const total = await District.countDocuments();
  if (total === 0) {
    try {
      const rawDistricts = fs.readFileSync(`${__dirname}/districts.json`);
      const districts = JSON.parse(rawDistricts);
      for (let index = 0; index < districts.length; index += 1) {
        const element = districts[index];
        console.log(`⇒ ${element.name_with_type}`);
        const newdistrict = await createDistrict(element);
        await createWard(newdistrict);
      }
      console.log('🎉 Completed task');
    } catch (error) {
      console.log(error);
      console.log('😖😖😖 Processing error ...');
      process.exit(1);
    }
  } else {
    console.log('🎉 Districts & wards are already exists');
  }
  mongoose.disconnect();
  process.exit(0);
};

generateDistricWard();
