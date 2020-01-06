/* eslint-disable no-console */
const app = require('./src/app');

// define port
const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  return console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} 🚀`
  );
});
