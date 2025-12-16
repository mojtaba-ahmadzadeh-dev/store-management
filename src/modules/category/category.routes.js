import { Router } from "express";
import categoryController from "./category.controller.js"
import { rbacGuard } from "../../middlewares/guard/rbac.guard.js";
const router = Router()

router.post('/create', rbacGuard(['ADMIN']), categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', rbacGuard(['ADMIN']), categoryController.updateCategoryById)
router.delete('/delete/:id', rbacGuard(['ADMIN']), categoryController.deleteCategory)


export { router as CategoryRoutes }