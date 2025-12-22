import { Router } from "express";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import discountController from "./discount.controller.js";
import { rbacGuard } from "../../middlewares/guard/rbac.guard.js";

const router = Router()

router.post('/', authGuard(), rbacGuard(['ADMIN']), discountController.create)
router.get('/', authGuard(), rbacGuard(['ADMIN']), discountController.getAllDiscount);
router.get('/:id', authGuard(), rbacGuard(['ADMIN']), discountController.getDiscountById);
router.patch('/:id', authGuard(), rbacGuard(['ADMIN']), discountController.updateDiscountById);
router.delete('/', authGuard(), rbacGuard(['ADMIN']), discountController.deleteAllDiscounts);
router.delete('/:id', authGuard(), rbacGuard(['ADMIN']), discountController.deleteDiscountById);

export { router as DiscountRoutes }