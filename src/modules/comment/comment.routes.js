import { Router } from "express";
import { commentController } from "./comment.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router();

router.post("/", authGuard, commentController.createComment);
router.get("/", commentController.getAllComments);


export { router as CommentRoutes };