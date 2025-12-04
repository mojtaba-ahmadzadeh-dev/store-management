import { Router } from "express";
import userController from "./user.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { validateChangeUserRole, validateUpdateUser } from "./user.validation.js";
const router = Router()

router.get('/', authGuard, userController.getAllUsers)
router.patch('/me/name', authGuard, userController.updateMyName);
router.get('/:id', userController.getUserById)
router.patch('/:id', authGuard, validateUpdateUser, userController.updateUser)
router.put('/:id/role', authGuard, validateChangeUserRole, userController.changeUserRole)
router.delete('/:id', authGuard, userController.deleteUser)

export { router as UserRoutes }
