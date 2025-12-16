import { Router } from "express";
import categoryController from "./category.controller.js"
const router = Router()

<<<<<<< HEAD
router.post('/create', authGuard(), categoryController.createCategory)
router.get('/', authGuard(), categoryController.getAllCategories)
router.get('/:id', authGuard(), categoryController.getCategoryById)
router.put('/:id', authGuard(), categoryController.updateCategoryById)
router.delete('/delete/:id', authGuard(), categoryController.deleteCategory)
=======
router.post('/create', categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', categoryController.updateCategoryById)
router.delete('/delete/:id', categoryController.deleteCategory)
>>>>>>> origin/develop

export { router as CategoryRoutes }