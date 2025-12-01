import express from 'express';
import dotenv from 'dotenv';
import { notFoundHandler } from './src/exception/not-found.exception.js';
import { errorHandler } from './src/exception/error-handler.js';

// Load environment variables
dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.initMiddleware();
        this.initRoutes();
        this.initErrorHandling();
    }

    // initialize middleware
    initMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
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