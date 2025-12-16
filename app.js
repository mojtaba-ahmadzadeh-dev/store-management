import express from 'express';
import dotenv from 'dotenv';
import { notFoundHandler } from './src/exception/not-found.exception.js';
import { sequelize } from './src/configs/sequelize.config.js';
import { errorHandler } from './src/exception/error-handler.js';
import SwaggerConfig from './src/configs/swagger.config.js';
import cookieParser from 'cookie-parser';
import { AuthRoutes } from './src/modules/auth/auth.routes.js';
import { initDatabase as initDb } from './src/configs/model.init.js';
import { UserRoutes } from './src/modules/user/user.routes.js';
import { CategoryRoutes } from './src/modules/category/category.routes.js';
import { ProductRoutes } from './src/modules/product/product.routes.js';
import { BasketRoutes } from './src/modules/basket/basket.routes.js';
import { OrderRoutes } from './src/modules/order/order.routes.js';
import { RBACRoutes } from './src/modules/RBAC/rbac.routes.js';

import { seedPermissionsAndRoles } from './src/configs/rbac.seed.js';

import { BlogRoutes } from './src/modules/blog/blog.routes.js';
import { CommentRoutes } from './src/modules/comment/comment.routes.js';
import { DiscountRoutes } from './src/modules/discount/discount.routes.js';
import { NotficationRoutes } from './src/modules/notfication/notfication.routes.js';


const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// Load environment variables
dotenv.config({ path: envFile });

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.mode = process.env.NODE_ENV || "development";

        this.initMiddleware();
        this.initRoutes();
        this.initSwagger();
        this.initDatabase();;
        this.initErrorHandling();
    }

    // initialize middleware
    initMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser())
    }

    initRoutes() {
        this.app.use('/auth', AuthRoutes)
        this.app.use('/users', UserRoutes)
        this.app.use('/category', CategoryRoutes)
        this.app.use('/product', ProductRoutes)
        this.app.use('/basket', BasketRoutes)
        this.app.use('/order', OrderRoutes)
        this.app.use('/', RBACRoutes)
        this.app.use('/blog', BlogRoutes)
        this.app.use('/comment', CommentRoutes)
        this.app.use('/discount', DiscountRoutes)
        this.app.use('/notfication', NotficationRoutes)
    }

    initSwagger() {
        SwaggerConfig(this.app)
    }

    async initDatabase() {
        try {
            await sequelize.authenticate();
            console.log('Database connection has been established successfully.');
            await initDb();
            await seedPermissionsAndRoles();
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