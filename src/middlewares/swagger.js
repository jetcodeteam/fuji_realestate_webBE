const swaggerJSDoc = require('swagger-jsdoc');

// setting swagger
const swaggerDefinition = {
  info: {
    title: 'Fujiwara API',
    version: '1.0.0',
    description: 'Fujiwara API Website',
  },
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};
const options = {
  swaggerDefinition,
  apis: [`${__dirname}/../components/**/*.controller.js`],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
