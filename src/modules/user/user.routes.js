import { Router } from "express";
import userController from "./user.controller.js";
import { validateChangeUserRole, validateUpdateUser } from "./user.validation.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { rbacGuard } from "../../middlewares/guard/rbac.guard.js";
const router = Router()

router.get('/', authGuard(), userController.getAllUsers)
router.patch('/me/name', authGuard(), userController.updateMyName);
router.get('/:id', userController.getUserById)
router.patch('/:id', authGuard(), rbacGuard(['ADMIN']), validateUpdateUser, userController.updateUser)
router.put('/role/:id', validateChangeUserRole, userController.changeUserRole)
router.delete('/delete/:id', authGuard(), rbacGuard(['ADMIN']), userController.deleteUser)
router.put('/ban/:id', authGuard(), rbacGuard(['ADMIN']), userController.banUser)
router.put('/unban/:id', authGuard(), rbacGuard(['ADMIN']), userController.unBanUser)

export { router as UserRoutes }