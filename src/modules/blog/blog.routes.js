import { Router } from "express";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { uploadBlogImage } from "../../middlewares/upload/upload.middleware.js";
import blogController from "./blog.controller.js";
import { validate } from "../../middlewares/validate/validate.js";
import { blogValidation } from "./blog.validation.js";
import { rbacGuard } from "../../middlewares/guard/rbac.guard.js";

const router = Router()

router.post('/create', authGuard(), rbacGuard(['ADMIN']),  uploadBlogImage.single("thumbnail"), validate(blogValidation), blogController.createBlog)
router.get('/', authGuard(), rbacGuard(['ADMIN']),  blogController.getAllBlogs)
router.get('/:id', authGuard(), rbacGuard(['ADMIN']),  blogController.getBlogById);
router.patch('/update/:id', authGuard(), uploadBlogImage.single("thumbnail"), validate(blogValidation), blogController.updateBlogById);
router.delete('/delete/:id', authGuard(), blogController.deleteBlogById);


export { router as BlogRoutes }