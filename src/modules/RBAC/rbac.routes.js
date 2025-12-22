import { Router } from "express";
import rbacController from "./rbac.controller.js";
import { validate } from "../../middlewares/validate/validate.js";
import { assignPermissionToRoleValidation, createPermissionValidation, createRoleValidation } from "./rbac.valiadtion.js";
import { rbacGuard } from '../../middlewares/guard/rbac.guard.js'
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router();

// ================= Permissions =================
router.post('/permission/add',
    authGuard(),
    rbacGuard("CREATE_PERMISSION"),
    validate(createPermissionValidation),
    rbacController.createPermission
);

router.get('/permission',
    authGuard(),
    rbacGuard("CREATE_PERMISSION"),
    rbacController.getAllPermissions
);

router.put('/permission/update/:id',
    authGuard(),
    rbacGuard("CREATE_PERMISSION"),
    validate(createPermissionValidation),
    rbacController.updatePermission
);

router.delete('/permission/delete/:id',
    authGuard(),
    rbacGuard("CREATE_PERMISSION"),
    rbacController.deletePermission
);

// ================= Roles =================
router.post('/role/add',
    authGuard(),
    rbacGuard("assign_role"),
    validate(createRoleValidation),
    rbacController.createRole
);

router.get('/role',
    authGuard(),
    rbacGuard("read_roles"),
    rbacController.getAllRoles
);

router.put('/role/update/:id',
    authGuard(),
    rbacGuard("assign_role"),
    validate(createRoleValidation),
    rbacController.updateRole
);

router.delete('/role/delete/:id',
    authGuard(),
    rbacGuard("assign_role"),
    rbacController.deleteRole
);

router.post('/role/assign-permission',
    authGuard(),
    rbacGuard("assign_role"),
    validate(assignPermissionToRoleValidation),
    rbacController.assignPermissionToRole
);

router.post('/role/assign-user',
    authGuard(),
    rbacGuard("assign_role"),
    rbacController.assignRoleToUser
);

export { router as RBACRoutes };