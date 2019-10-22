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

function generateWard(district) {
  const wardRawData = fs.readFileSync(`${district.code}.json`);
  const districtId = district._id;
  const wardData = JSON.parse(wardRawData);
  const wardList = Object.keys(wardData);
  wardList.forEach(wardKey => {
    console.log(wardKey);
    const wardInfo = wardData[wardKey];
    const ward = new Ward({
      _id: mongoose.Types.ObjectId(),
      ...wardInfo,
      district: districtId,
    });
    ward.save(err => {
      if (err) {
        console.log(err);
      }
      district.ward.push(ward);
      district.save(otherErr => {
        if (err) {
          console.log(otherErr);
        }
      });
    });
  });
}

// const rawdata = fs.readFileSync('districts.json');
// const districts = JSON.parse(rawdata);
// const len = districts.length;
// let i = 0;
// districts.forEach(async distInfo => {
//   const district = new District({
//     _id: new mongoose.Types.ObjectId(),
//     ...distInfo,
//   });
//   await district.save(async err => {
//     if (err) {
//       console.log(err);
//     }
//     await generateWard(district);
//     i += 1;
//     if (i === len - 1) {
//       mongoose.disconnect();
//     }
//   });
// });

District.find({ code: 760 })
  .populate('ward')
  .exec((err, ward) => {
    if (err) console.log(err);
    console.log(ward);
  });
