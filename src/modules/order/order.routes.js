import express from "express";
import orderController from "./order.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = express.Router();

router.post("/create" , authGuard, orderController.createOrder);

export {router as OrderRoutes};
