import express from "express";
import orderController from "./order.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { rbacGuard } from "../../middlewares/guard/rbac.guard.js";

const router = express.Router();

router.post("/create", authGuard(), orderController.createOrder);
router.get("/admin", authGuard(), rbacGuard(['ADMIN']), orderController.getAllOrders);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);
router.delete("/delete/:id", authGuard(), orderController.deleteOrder);
router.put("/update-status/:id", authGuard(), rbacGuard(['ADMIN']), orderController.updateOrderStatus);
router.get("/admin/status", authGuard(), rbacGuard(['ADMIN']), orderController.getOrdersByStatus);

export { router as OrderRoutes };