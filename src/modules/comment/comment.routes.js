import { Router } from "express";
import { authGuard } from "../../middlewares/guard/auth.guard.js";
import commentController from "./comment.controller.js";

const router = Router();

router.post("/", authGuard(), commentController.createComment);
router.get("/", commentController.getAllComments);
router.get("/product/:product_id", commentController.getCommentsByProduct);
router.patch("/:id", authGuard(), commentController.updateComment);
router.put("/like/:id", authGuard(), commentController.toggleCommentLike);
router.delete("/admin/:id", authGuard(), commentController.deleteCommentByAdmin);


export { router as CommentRoutes };