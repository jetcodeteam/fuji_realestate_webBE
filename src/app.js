/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const RedisStore = require('rate-limit-redis');

// register strategy local, jwt
require('./middlewares/passport');

// root api
const api = require('./components');

// init app
const app = express();

// register middleware
app.use(
  helmet({
    frameguard: { action: 'sameorigin' },
  })
);
app.use(bodyparser.json());
app.use(cors());
app.use(
  new RateLimit({
    store: new RedisStore(),
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// setup swagger
const swaggerDocument = require('./middlewares/swagger.json');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connecting mongodb
mongoose.connect(process.env.MONGODB_URI_JETCODE, {
  useNewUrlParser: true,
  autoIndex: false,
});
if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

// init admin user
require('./config/initAdminUser');

// logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// register api
app.use('/api', api);

// Not found
app.use((req, res, next) =>
  res.status(404).send({ message: `${req.url} not found.` })
);

// Any error
app.use((err, req, res, next) => res.status(500).send({ error: err }));

module.exports = app;
