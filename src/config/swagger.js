const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expiry Date Manager API',
            version: '1.0.0',
            description: 'REST API documentation for the Expiry Date Manager application',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5001}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'jwtToken',
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
