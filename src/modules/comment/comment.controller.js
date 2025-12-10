import { CommentMessage } from "../../constant/messages.constant.js";
import { commentService } from "./comment.service.js";

class CommentController {

    async createComment(req, res) {
        try {
            const { content, blog_id, product_id } = req.body;
            const user_id = req.user.id;

            if (!content || (!blog_id && !product_id)) {
                return res.status(400).json({ message: CommentMessage.REQUIRED });
            }

            const comment = await commentService.createComment({ content, user_id, blog_id, product_id });
            res.status(201).json({ message: CommentMessage.CREATE_COMMENT_SUCCESS, comment });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: CommentMessage.INTERNAL_ERROR });
        }
    }

    async getAllComments(req, res, next) {
        try {
            const comments = await commentService.getAllComments();
            res.status(200).json({
                message: CommentMessage.BLOG_FETCHED,
                comments
            });
        } catch (error) {
            next(error)
        }
    }

    async getCommentsByProduct(req, res, next) {
        try {
            const { product_id } = req.params;
            const { page = 1, limit = 10 } = req.query;

            const result = await commentService.getCommentsByProduct(product_id, +page, +limit);

            res.status(200).json({
                message: CommentMessage.FETCHED_SUCCESS,
                ...result
            });

        } catch (error) {
            next(error)
        }
    }

    async updateComment(req, res, next) {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const user_id = req.user.id;

            const result = await commentService.updateComment(id, user_id, content);

            res.status(200).json({
                message: CommentMessage.UPDATE_SUCCESS,
                comment: result
            });

        } catch (error) {
            next(error);
        }
    }

    async toggleCommentLike(req, res, next) {
        try {
            const { id } = req.params;
            const { mode } = req.body;
            const comment = await commentService.toggleCommentLike(id, mode);
            res.status(200).json({
                message: `Comment ${mode}d successfully`,
                comment
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteCommentByAdmin(req, res, next) {
        try {
            const { id } = req.params;
            const userRole = req.user.role;
            const result = await commentService.deleteCommentByAdmin(id, userRole);
            res.status(200).json({
                message: CommentMessage.DELETED_COMMENT_SUCCESS,
                result
            });
        } catch (error) {
            next(error)
        }
    }
}

export const commentController = new CommentController();