import { Router } from "express";
import rbacController from "./rbac.controller.js";
import { validate } from "../../middlewares/validate/validate.js";
import { 
    assignPermissionToRoleValidation, 
    createPermissionValidation, 
    createRoleValidation 
} from "./rbac.valiadtion.js";
const router = Router();

// ================= Permissions =================

router.post(
    '/permission/add',
    validate(createPermissionValidation),
    rbacController.createPermission
);

router.get(
    '/permission', 
    rbacController.getAllPermissions
);

router.put(
    '/permission/update/:id',
    validate(createPermissionValidation),
    rbacController.updatePermission
);

router.delete(
    '/permission/delete/:id',
    rbacController.deletePermission
);

// ================= Roles =================

router.post(
    '/role/add',
    validate(createRoleValidation),
    rbacController.createRole
);

router.get(
    '/role',
    rbacController.getAllRoles      
);

router.put(
    '/role/update/:id',
    validate(createRoleValidation),
    rbacController.updateRole
);

router.delete(
    '/role/delete/:id',
    rbacController.deleteRole
);

router.post(
    '/role/assign-permission',
    validate(assignPermissionToRoleValidation),
    rbacController.assignPermissionToRole
);

export { router as RBACRoutes };
