const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Decor API',
            version: '1.0.0',
            description: '',
        },
    },
    apis: ['./docs/*.yml', './docs/*/*.yml'],
};
const specs = swaggerJsdoc(options);

module.exports = {
    specs,
};
