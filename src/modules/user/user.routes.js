import { Router } from "express";
import userController from "./user.controller.js";

const router = Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.patch('/:id', userController.updateUser)
router.put('/:id/role', userController.changeUserRole)

export { router as UserRoutes }