import { Router } from "express";
import rbacController from "./rbac.controller.js";

const router = Router()

router.post('/permission/add', rbacController.createRole)

export {router as RBACRoutes}