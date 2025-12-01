import express from 'express';
import dotenv from 'dotenv';
import { notFoundHandler } from './src/exception/not-found.exception.js';
import { sequelize } from './src/configs/sequelize.config.js';
import { errorHandler } from './src/exception/error-handler.js';
import SwaggerConfig from './src/configs/swagger.config.js';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// Load environment variables
dotenv.config({ path: envFile });

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.mode = process.env.NODE_ENV || "development";


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
            const runningMode = `Server running in ${this.mode} mode`;
            const runningOnPort = `on port ${this.port}`;
            const runningSince = `[since ${new Date().toISOString()}]`;
            console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
            console.log(`🏁 —> swagger: http://localhost:${this.port}`);
        });
    }
}

// create and run the server
const server = new App();
server.listen();