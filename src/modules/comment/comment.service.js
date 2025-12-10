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

    async getCommentsByProduct(product_id, page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const { rows, count } = await Comment.findAndCountAll({
            where: { product_id },
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });
        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            comments: rows
        }
    }

    async updateComment(id, user_id, content) {
        const comment = await Comment.findByPk(id);

        if (!comment) throw createHttpError(404, CommentMessage.NOT_FOUND)

        if (comment.user_id !== user_id) throw createHttpError(CommentMessage.ACCESS_DENIED)

        comment.content = content;
        await comment.save();

        return comment;
    }

    async toggleCommentLike(id, mode) {
        const comment = await Comment.findByPk(id);
        if (!comment) throw createHttpError(404, "Comment not found");
        if (mode === "like") {
            comment.likes += 1;
        } else if (mode === "dislike") {
            comment.dislikes += 1;
        } else {
            throw createHttpError(400, "Invalid mode, must be 'like' or 'dislike'");
        }
        await comment.save();
        return comment;
    }

    async deleteCommentByAdmin(id, userRole) {
        if (userRole !== "admin") throw createHttpError(403, CommentMessage.ADMIN_DELETE_DENIED);

        const comment = await Comment.findByPk(id);
        if (!comment) throw createHttpError(404, CommentMessage.NOT_FOUND);

        await comment.destroy();
        return comment
    }
}

export const commentService = new CommentService();