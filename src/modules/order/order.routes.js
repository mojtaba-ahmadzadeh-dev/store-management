import express from "express";
import orderController from "./order.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";


const router = express.Router();

router.post("/create", authGuard(), orderController.createOrder);
router.get("/admin", authGuard(), orderController.getAllOrders);
router.get("/", authGuard(), orderController.getUserOrders);
router.patch("/update/:id", authGuard(), orderController.updateOrder);
router.get("/:id", authGuard(), orderController.getOrderById);
router.delete("/delete/:id", authGuard(), orderController.deleteOrder);
router.put("/update-status/:id", authGuard(), orderController.updateOrderStatus);
router.get("/admin/status", authGuard(), orderController.getOrdersByStatus);

export { router as OrderRoutes };