import { Router } from "express";
import rbacController from "./rbac.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router()

router.post('/permission/add', authGuard, rbacController.createPermission)
router.get('/permission', authGuard, rbacController.getAllPermissions)
router.put('/permission/update/:id', authGuard, rbacController.updatePermission)
router.delete('/permission/delete/:id', authGuard, rbacController.deletePermission)
router.post('/role/add', authGuard, rbacController.createRole)
router.get('/role', authGuard, rbacController.getAllPermissions)
router.put('/role/update/:id', authGuard, rbacController.updateRole)
router.delete('/role/delete/:id', authGuard, rbacController.deleteRole)
router.post('/role/assign-permission', authGuard, rbacController.assignPermissionToRole)

export { router as RBACRoutes }