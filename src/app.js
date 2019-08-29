/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const middlewares = require('./middlewares');

// root api
const apiRouter = require('./components');

// init app
const app = express();

// serve static
app.use('/static', express.static(path.join(__dirname, '../uploads')));

// init middlewares
middlewares.apply(app);

// connecting mongodb
mongoose.connect(process.env.MONGODB_URI_JETCODE, {
  useNewUrlParser: true,
  autoIndex: false,
});
if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

// register api
app.use('/api', apiRouter);

// Not found
app.use((req, res, next) =>
  res.status(404).send({ message: `${req.url} not found.` })
);

// Any error
app.use((err, req, res, next) => res.status(500).send({ error: err }));

module.exports = app;
