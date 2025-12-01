import swaggerJsDocs from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const SwaggerConfig = (app) => {
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Store Management API',
                version: '1.0.0',
                description: 'API documentation for Store Management project',
            }
        },
        apis: ['/src/modules/**/*.swagger.js'],
    };

    const swaggerSpec = swaggerJsDocs(swaggerOptions);
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default SwaggerConfig;
