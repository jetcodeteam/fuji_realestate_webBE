/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');

// register strategy local, jwt
require('./middlewares/passport');

// root api
const api = require('./components');

// init app
const app = express();

// register middleware
app.use(bodyparser.json());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again after 15 mintutes',
  })
);

// setup swagger
const swaggerSpec = require('./middlewares/swagger');

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// connecting mongodb
mongoose.connect(process.env.MONGODB_URI_ADMIN, {
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
