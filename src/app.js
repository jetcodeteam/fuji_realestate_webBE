const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

// root api
const api = require('./components');

// init app
const app = express();

// register middleware
app.use(bodyparser.json());
app.use(cors);

// register api
app.use('/api', api);

module.exports = app;
