import { Router } from "express";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import notficationController from "./notfication.controller.js";

const router = Router()

router.post('/', authGuard, notficationController.createNotfication)
router.get("/user/:id",  notficationController.getUserNotifications);

export {router as NotficationRoutes}