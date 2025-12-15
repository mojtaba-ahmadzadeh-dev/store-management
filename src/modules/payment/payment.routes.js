import { Router } from "express";
import paymentController from "./payment.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router();

router.post('/', authGuard(), paymentController.paymentBasket);
router.get('/verify', paymentController.paymentVerify);

export { router as PaymentRoutes };