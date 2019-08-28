const bodyparser = require('body-parser');
const cors = require('cors');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const getStore = require('./redisClient');

// register strategy local, jwt
require('./passport');

// apply middleware
const apply = app => {
  app.use(logger('dev'));

  // secure http
  app.use(
    helmet({
      frameguard: { action: 'sameorigin' },
    })
  );
  // handle application/json
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(cors());

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
