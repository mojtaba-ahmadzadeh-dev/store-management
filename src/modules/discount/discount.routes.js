import { Router } from "express";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import discountController from "./discount.controller.js";

const router = Router()

router.post('/', authGuard, discountController.create)

export {router as DiscountRoutes}