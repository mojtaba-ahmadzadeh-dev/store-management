import express from "express";
import orderController from "./order.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/create", authGuard, orderController.createOrder);
router.get("/admin", adminMiddleware, orderController.getAllOrders);
router.get("/", authGuard, orderController.getUserOrders);
router.get("/:id", authGuard, orderController.getOrderById);
router.patch("/update/:id", authGuard, orderController.updateOrder);

export { router as OrderRoutes };