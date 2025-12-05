import { Router } from "express";
import productController from "./product.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { uploadProductImage } from "../../middlewares/upload/upload.middleware.js";

const router = Router()

router.post('/create', authGuard, uploadProductImage.single('image'), productController.createProduct)
router.get('/', authGuard, productController.getAllProducts)
router.get('/:id', authGuard, productController.getProductById)
router.delete('/:id', authGuard, productController.deleteProductById)
router.patch('/update/:id', authGuard, productController.updateProductById)
router.put('/like/:id', authGuard, productController.toggleProductLike)
router.put('/bookmark/:id', authGuard, productController.toggleProductBookmark)

export { router as ProductRoutes }