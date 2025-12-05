import { Router } from "express";
import productController from "./product.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router()

router.post('/create', authGuard, productController.createProduct)
router.get('/', authGuard, productController.getAllProducts)
router.get('/:id', authGuard, productController.getProductById)

export { router as ProductRoutes }