import { Router } from "express";
import categoryController from "./category.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router()

router.post('/create', authGuard, categoryController.createCategory)
router.get('/', authGuard, categoryController.getAllCategories)
router.get('/:id', authGuard, categoryController.getCategoryById)
router.delete('/:id', authGuard, categoryController.deleteCategory)

export { router as CategoryRoutes }