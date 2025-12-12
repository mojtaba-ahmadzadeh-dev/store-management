import { Router } from "express";
import productController from "./product.controller.js";
import { uploadProductImage } from "../../middlewares/upload/upload.middleware.js";
import { validate } from "../../middlewares/validate/validate.js";
import { productValidation } from "./product.validation.js";

const router = Router()

router.post('/create', uploadProductImage.single('image'),
    validate(productValidation),
    productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.delete('/:id', productController.deleteProductById)
router.patch('/update/:id', validate(productValidation), productController.updateProductById)
router.put('/like/:id', productController.toggleProductLike)
router.put('/bookmark/:id', productController.toggleProductBookmark)

export { router as ProductRoutes }