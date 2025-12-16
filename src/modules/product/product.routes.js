import { Router } from "express";
import productController from "./product.controller.js";
import { uploadProductImage } from "../../middlewares/upload/upload.middleware.js";
import { validate } from "../../middlewares/validate/validate.js";
import { productValidation } from "./product.validation.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { rbacGuard } from "../../middlewares/guard/rbac.guard.js";

const router = Router();

router.post('/create', authGuard(),
    rbacGuard(['ADMIN']),
    uploadProductImage.single('image'),
    validate(productValidation),
    productController.createProduct
);

router.delete(
    '/:id',
    authGuard(),
    rbacGuard(['ADMIN']),
    productController.deleteProductById
);

router.patch(
    '/update/:id',
    authGuard(),
    rbacGuard(['ADMIN']),
    validate(productValidation),
    productController.updateProductById
);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.put('/like/:id', authGuard(), productController.toggleProductLike);
router.put('/bookmark/:id', authGuard(), productController.toggleProductBookmark);

export { router as ProductRoutes };