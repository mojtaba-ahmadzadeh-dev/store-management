import { commentService } from "./comment.service.js";

class CommentController {

    async createComment(req, res) {
        try {
            const { content, blog_id, product_id } = req.body;
            const user_id = req.user.id;

            if (!content || (!blog_id && !product_id)) {
                return res.status(400).json({ message: "Content and either blog_id or product_id are required." });
            }

            const comment = await commentService.createComment({ content, user_id, blog_id, product_id });
            res.status(201).json({ message: "Comment created successfully", comment });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export const commentController = new CommentController();