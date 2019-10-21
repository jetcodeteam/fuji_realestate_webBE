const fs = require('fs');

const rawdata = fs.readFileSync('districts.json');
const districts = JSON.parse(rawdata);