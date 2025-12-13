import express from "express";
import orderController from "./order.controller.js";


const router = express.Router();

<<<<<<< HEAD
router.post("/create", orderController.createOrder);
router.get("/admin", orderController.getAllOrders);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);
=======
router.post("/create", authGuard, orderController.createOrder);
router.get("/admin", authGuard, adminMiddleware, orderController.getAllOrders);
router.get("/", authGuard, orderController.getUserOrders);
router.patch("/update/:id", authGuard, orderController.updateOrder);
router.get("/:id", authGuard, orderController.getOrderById);
router.delete("/delete/:id", authGuard, orderController.deleteOrder);
router.put("/update-status/:id", authGuard, adminMiddleware, orderController.updateOrderStatus);
router.get("/admin/status", authGuard, adminMiddleware, orderController.getOrdersByStatus);
>>>>>>> develop

export { router as OrderRoutes };