import autoBind from "auto-bind";
import blogService from "./blog.service.js";
import { BlogMessage } from "../../constant/messages.constant.js";

class BlogController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = blogService;
    }

    async createBlog(req, res, next) {
        try {
            const thumbnail = req.file ? `/uploads/products/${req.file.filename}` : null;
            const blog = await this.#service.createBlog({
                ...req.body,
                author_id: req.user.id,
                thumbnail,
            });

            res.status(201).json({
                message: BlogMessage.CREATE_BLOG_SUCESS,
                blog,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new BlogController();
