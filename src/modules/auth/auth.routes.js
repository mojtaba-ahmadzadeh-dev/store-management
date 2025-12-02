import { Router } from "express";
import authController from "./auth.controller.js";
import { validateCheckOTP, validateSendOTP } from "./auth.validation.js";

const router = Router()

router.post('/send-otp', validateSendOTP, authController.sendOTP)
router.post('/check-otp', validateCheckOTP, authController.checkOTP)
router.post('/refresh-token', authController.refreshToken)

export { router as AuthRoutes }