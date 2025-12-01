import { Router } from "express";
import authController from "./auth.controller.js";

const router = Router()

router.post('/send-otp', authController.sendOTP)

export { router as AuthRoutes }