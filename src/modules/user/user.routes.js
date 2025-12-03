import { Router } from "express";
import userController from "./user.controller.js";

const router = Router()

router.get('/', userController.getAllUsers)

export { router as UserRoutes }