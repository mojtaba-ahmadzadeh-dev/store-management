import { Router } from "express";
import userController from "./user.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { validateChangeUserRole, validateUpdateUser } from "./user.validation.js";
const router = Router()

router.get('/', authGuard(), userController.getAllUsers)
router.patch('/me/name', authGuard(), userController.updateMyName);
router.get('/:id', userController.getUserById)
router.patch('/:id', authGuard(), validateUpdateUser, userController.updateUser)
router.put('/role/:id', authGuard(), validateChangeUserRole, userController.changeUserRole)
router.delete('/delete/:id', authGuard(), userController.deleteUser)
router.put('/ban/:id', authGuard(), userController.banUser)
router.put('/unban/:id', authGuard(), userController.unBanUser)

export { router as UserRoutes }