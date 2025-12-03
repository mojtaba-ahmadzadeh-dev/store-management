import { Router } from "express";
import userController from "./user.controller.js";

const router = Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)

export { router as UserRoutes }