import createHttpError from "http-errors";
import { Comment } from "./comment.model.js";
import { CommentMessage } from "../../constant/messages.constant.js";

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

    async updateComment(id, user_id, content) {
        const comment = await Comment.findByPk(id);

        if (!comment) throw createHttpError(404, CommentMessage.NOT_FOUND)

        if (comment.user_id !== user_id) throw createHttpError(CommentMessage.ACCESS_DENIED)

        comment.content = content;
        await comment.save();

        return comment;
    }
}

export const commentService = new CommentService();