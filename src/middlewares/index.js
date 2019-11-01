const bodyparser = require('body-parser');
const cors = require('cors');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const YAML = require('yamljs');
const rfs = require('rotating-file-stream');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');

const getStore = require('./redisClient');
// register strategy local, jwt
require('./passport');

// apply middleware
const apply = app => {
  const accessLogStream = rfs('access.log', {
    size: '1G',
    interval: '3M', // rotate daily
    path: path.join(__dirname, '../../log'),
  });
  app.use(logger('combined', { stream: accessLogStream }));
  // secure http
  app.use(
    helmet({
      frameguard: { action: 'sameorigin' },
    })
  );
  // handle application/json
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: ['https://fujiwara-realestate.com', 'http://localhost:3000'],
      methods: 'GET,PUT,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: 86400,
    })
  );

  // handle cache ip for limit request
  app.use(
    new RateLimit({
      store: getStore(),
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
  );

  // setup swagger
  const swaggerDocument = YAML.load(`${__dirname}/swagger.yaml`);
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
module.exports = {
  apply,
};
