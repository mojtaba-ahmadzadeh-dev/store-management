import { Router } from "express";
import rbacController from "./rbac.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { validate } from "../../middlewares/validate/validate.js";
import { assignPermissionToRoleValidation, createPermissionValidation, createRoleValidation } from "./rbac.valiadtion.js";

const router = Router()

router.post('/permission/add', authGuard, validate(createPermissionValidation), rbacController.createPermission)
router.get('/permission', authGuard, rbacController.getAllPermissions)
router.put('/permission/update/:id', authGuard, validate(createPermissionValidation), rbacController.updatePermission)
router.delete('/permission/delete/:id', authGuard, rbacController.deletePermission)

router.post('/role/add', authGuard, validate(createRoleValidation), rbacController.createRole)
router.get('/role', authGuard, rbacController.getAllPermissions)
router.put('/role/update/:id', authGuard, validate(createRoleValidation), rbacController.updateRole)
router.delete('/role/delete/:id', authGuard, rbacController.deleteRole)
router.post('/role/assign-permission', authGuard, validate(assignPermissionToRoleValidation), rbacController.assignPermissionToRole)

export { router as RBACRoutes }