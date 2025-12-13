import { Router } from "express";
import authController from "./auth.controller.js";
import { validateCheckOTP, validateSendOTP } from "./auth.validation.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router();

router.post('/send-otp', validateSendOTP, authController.sendOTP);
router.post('/check-otp', validateCheckOTP, authController.checkOTP);
router.post('/refresh-token', authController.refreshToken);
router.get('/me', authGuard(), authController.getMe);
router.post('/logout', authGuard(), authController.logout);

export { router as AuthRoutes };