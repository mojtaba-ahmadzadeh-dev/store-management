import { Router } from "express";
import authController from "./auth.controller.js";

const router = Router()

router.post('/send-otp', authController.sendOTP)
router.post('/check-otp', authController.checkOTP)
router.post('/refresh-token', authController.refreshToken)

export { router as AuthRoutes }