import express from 'express';
import dotenv from 'dotenv';
import { notFoundHandler } from './src/exception/not-found.exception.js';
import { sequelize } from './src/configs/sequelize.config.js';
import { errorHandler } from './src/exception/error-handler.js';
import SwaggerConfig from './src/configs/swagger.config.js';

// Load environment variables
dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.initMiddleware();
        this.initSwagger();
        this.initDatabase();;
        this.initErrorHandling();
    }

    // initialize middleware
    initMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initSwagger() {
        SwaggerConfig(this.app)
    }

    async initDatabase() {
        try {
            await sequelize.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.log('Unable to connect to the database:', error);
        }
    }

    // error handler
    initErrorHandling() {
        this.app.use(notFoundHandler)
        this.app.use(errorHandler)
    }

    // start the server
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on http://localhost:${this.port}`);
        });
    }
}

// create and run the server
const server = new App();
server.listen();