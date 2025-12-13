import { Router } from "express";
import userController from "./user.controller.js";
import { validateChangeUserRole, validateUpdateUser } from "./user.validation.js";
const router = Router()

router.get('/', userController.getAllUsers)
router.patch('/me/name', userController.updateMyName);
router.get('/:id', userController.getUserById)
router.patch('/:id', validateUpdateUser, userController.updateUser)
router.put('/role/:id', validateChangeUserRole, userController.changeUserRole)
router.delete('/delete/:id', userController.deleteUser)
router.put('/ban/:id', userController.banUser)
router.put('/unban/:id', userController.unBanUser)

export { router as UserRoutes }