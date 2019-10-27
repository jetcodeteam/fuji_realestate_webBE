/* eslint-disable no-console */
const app = require('./src/app');

// define port
const PORT = process.env.PORT || '3000';

app.listen(PORT, 'localhost', () => {
  return console.log(`App is running on port ${PORT} 🚀`);
});
