import { Comment } from "./comment.model.js";

class CommentService {

    async createComment({ content, user_id, blog_id, product_id = null }) {
        if (!blog_id && !product_id) {
            throw new Error("Either blog_id or product_id must be provided");
        }

        const comment = await Comment.create({
            content,
            user_id,
            blog_id,
            product_id
        });

        return comment;
    }

    async getAllComments() {
        return await Comment.findAll({
            order: [['createdAt', 'DESC']],
        });
    }

}

export const commentService = new CommentService();
