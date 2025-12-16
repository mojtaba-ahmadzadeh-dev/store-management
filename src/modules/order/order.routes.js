import express from "express";
import orderController from "./order.controller.js";
<<<<<<< HEAD
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
=======
<<<<<<< HEAD
import { authGuard } from "../../middlewares/guard/auth.guard.js";
=======
>>>>>>> origin/develop


const router = express.Router();

<<<<<<< HEAD
router.post("/create", authGuard(), orderController.createOrder);
router.get("/admin", authGuard(), orderController.getAllOrders);
router.get("/", authGuard(), orderController.getUserOrders);
router.patch("/update/:id", authGuard(), orderController.updateOrder);
router.get("/:id", authGuard(), orderController.getOrderById);
router.delete("/delete/:id", authGuard(), orderController.deleteOrder);
router.put("/update-status/:id", authGuard(), orderController.updateOrderStatus);
router.get("/admin/status", authGuard(), orderController.getOrdersByStatus);
=======
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
>>>>>>> origin/develop
>>>>>>> origin/develop

export { router as OrderRoutes };