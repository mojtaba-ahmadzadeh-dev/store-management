import { Router } from "express";
import categoryController from "./category.controller.js"
const router = Router()

router.post('/create', categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', categoryController.updateCategoryById)
router.delete('/delete/:id', categoryController.deleteCategory)

export { router as CategoryRoutes }