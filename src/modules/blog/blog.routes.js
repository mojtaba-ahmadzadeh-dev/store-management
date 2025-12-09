import { Router } from "express";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import { uploadBlogImage } from "../../middlewares/upload/upload.middleware.js";
import blogController from "./blog.controller.js";

const router = Router()

router.post('/', authGuard, uploadBlogImage.single("thumbnail"), blogController.createBlog)

export { router as BlogRoutes }