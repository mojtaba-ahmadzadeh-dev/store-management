import autoBind from "auto-bind";
import { Blog } from "./blog.model.js";
import createHttpError from "http-errors";
import { BlogMessage } from "../../constant/messages.constant.js";

class BlogService {
    constructor() {
        autoBind(this);
    }

    async createBlog(data) {
        const { title, summary, content, thumbnail, slug, status, category_id, author_id } = data;

        const exist = await Blog.findOne({ where: { slug } });
        if (exist) createHttpError(400, BlogMessage.SLUG_ALREADY_EXISTS);

        const blog = await Blog.create({
            title,
            summary,
            content,
            thumbnail,
            slug,
            status,
            category_id,
            author_id,
        });

        return blog;
    }
}

export default new BlogService();
