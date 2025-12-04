import path from 'path';
import swaggerJsDocs from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        apis: [path.join(__dirname, '../modules/**/*.swagger.js')],
    };

    const swaggerSpec = swaggerJsDocs(swaggerOptions);
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default SwaggerConfig;
