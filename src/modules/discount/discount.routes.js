import { Router } from "express";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import discountController from "./discount.controller.js";

const router = Router()

router.post('/', authGuard, discountController.create)
router.get('/', authGuard, discountController.getAllDiscount);
router.get('/:idOrCode', authGuard, discountController.getDiscountById);

export { router as DiscountRoutes }