import { Router } from "express";
import productController from "./product.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { uploadProductImage } from "../../middlewares/upload/upload.middleware.js";
import { validate } from "../../middlewares/validate/validate.js";
import { productValidation } from "./product.validation.js";

const router = Router()

router.post('/create', authGuard, uploadProductImage.single('image'),
    validate(productValidation),
    productController.createProduct)
router.get('/', authGuard, productController.getAllProducts)
router.get('/:id', authGuard, productController.getProductById)
router.delete('/:id', authGuard, productController.deleteProductById)
router.patch('/update/:id', authGuard, validate(productValidation), productController.updateProductById)
router.put('/like/:id', authGuard, productController.toggleProductLike)
router.put('/bookmark/:id', authGuard, productController.toggleProductBookmark)

export { router as ProductRoutes }