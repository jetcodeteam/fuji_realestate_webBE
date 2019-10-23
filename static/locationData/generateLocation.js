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

const createWard = district => {
  const rawWards = fs.readFileSync(`${__dirname}/${district.code}.json`);
  const wards = JSON.parse(rawWards);
  const wardIds = Object.keys(wards);
  (function next(index) {
    if (index === wardIds.length) {
      // No items left
      return;
    }
    const wardId = wardIds[index];
    const wardInfo = wards[wardId];
    const ward = new Ward({
      _id: mongoose.Types.ObjectId(),
      ...wardInfo,
      district: district._id,
    });
    ward.save(err => {
      if (err) console.log(err);
      district.ward.push(ward);
      district.save(err1 => {
        if (err1) console.log(err1);
        next(index + 1);
      });
    });
  })(0);
};

// Main
const rawDistricts = fs.readFileSync(`${__dirname}/districts.json`);
const districts = JSON.parse(rawDistricts);

const generateDistricWard = () => {
  District.countDocuments().then(total => {
    if (total === 0) {
      console.log('Generating districts & wards ...');
      (function next(index) {
        if (index === districts.length) {
          // No items left
          setTimeout(() => {
            mongoose.disconnect();
          }, 2000);
          console.log('Completed task');
          process.exit(0);
          return;
        }
        const districtInfo = districts[index];
        createDistrict(districtInfo).then(district => {
          createWard(district);
          next(index + 1);
        });
      })(0);
    } else {
      console.log('District & ward are already exists');
      process.exit(0);
    }
  });
};

generateDistricWard();
