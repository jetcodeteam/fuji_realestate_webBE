const fs = require('fs');
const util = require('util');

const logFile = fs.createWriteStream(`${__dirname}/../../log/error.log`, {
  flags: 'a',
});
const logStdout = process.stdout;

const logger = (app, mes) => {
  const time = new Date().toLocaleString();
  logFile.write(`${time}: ${app} | ${util.format(mes)}\n`);
  logStdout.write(`${time}: ${app} | ${util.format(mes)}\n`);
};
module.exports = logger;
