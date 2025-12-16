import { Router } from "express";
import userController from "./user.controller.js";
import { validateChangeUserRole, validateUpdateUser } from "./user.validation.js";
const router = Router()

<<<<<<< HEAD
router.get('/', authGuard(), userController.getAllUsers)
router.patch('/me/name', authGuard(), userController.updateMyName);
router.get('/:id', userController.getUserById)
router.patch('/:id', authGuard(), validateUpdateUser, userController.updateUser)
router.put('/role/:id', authGuard(), validateChangeUserRole, userController.changeUserRole)
router.delete('/delete/:id', authGuard(), userController.deleteUser)
router.put('/ban/:id', authGuard(), userController.banUser)
router.put('/unban/:id', authGuard(), userController.unBanUser)
=======
router.get('/', userController.getAllUsers)
router.patch('/me/name', userController.updateMyName);
router.get('/:id', userController.getUserById)
router.patch('/:id', validateUpdateUser, userController.updateUser)
router.put('/role/:id', validateChangeUserRole, userController.changeUserRole)
router.delete('/delete/:id', userController.deleteUser)
router.put('/ban/:id', userController.banUser)
router.put('/unban/:id', userController.unBanUser)
>>>>>>> origin/develop

export { router as UserRoutes }