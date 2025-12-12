import express from "express";
import orderController from "./order.controller.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/create", orderController.createOrder);
router.get("/admin", adminMiddleware, orderController.getAllOrders);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);

export { router as OrderRoutes };