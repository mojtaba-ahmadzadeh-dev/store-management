import express from "express";
import orderController from "./order.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = express.Router();

router.post("/create" , authGuard, orderController.createOrder);
router.get("/" , authGuard, orderController.getUserOrders);
router.get("/:id" , authGuard, orderController.getOrderById);

export {router as OrderRoutes};