import { Router } from "express";
import rbacController from "./rbac.controller.js";

const router = Router()

router.post('/permission/add', rbacController.createPermission)
router.get('/permission', rbacController.getAllPermissions)
 
export {router as RBACRoutes}