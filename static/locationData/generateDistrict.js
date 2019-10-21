const fs = require('fs');
const mongoose = require('mongoose');
const District = require('../../src/apis/locations/district');
const Ward = require('../../src/apis/locations/ward');

const rawdata = fs.readFileSync('districts.json');
const districts = JSON.parse(rawdata);

mongoose.connect(process.env.MONGODB_URI_JETCODE, {
  useNewUrlParser: true,
  autoIndex: false,
  useUnifiedTopology: true,
});
if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

const len = districts.length;
let i = 0;
districts.map(async distInfo => {
  const district = new District({
    _id: new mongoose.Types.ObjectId(),
    ...distInfo,
  });
  await district.save(err => {
    if (err) {
      console.log(err);
    }
    i += 1;
    if (i === len - 1) {
      mongoose.disconnect();
    }
  });
});
