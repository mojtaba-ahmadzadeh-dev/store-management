import { Router } from "express";
import productController from "./product.controller.js";

const router = Router()

router.post('/create', productController.createProduct)

export {router as ProductRoutes}