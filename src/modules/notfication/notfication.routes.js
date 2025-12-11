import { Router } from "express";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import notficationController from "./notfication.controller.js";
import { validate } from "../../middlewares/validate/validate.js";
import { notficationValidation } from "./notfication.validation.js";

const router = Router()

router.post('/', authGuard, validate(notficationValidation), notficationController.createNotfication)
router.get("/user/:id", notficationController.getUserNotifications);

export { router as NotficationRoutes }