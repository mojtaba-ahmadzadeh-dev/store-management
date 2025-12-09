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

    async getAllBlogs() {
        return await Blog.findAll({
            attributes: {
                exclude: ["updatedAt"]
            },
            order: [["createdAt", "DESC"]]
        })
    }

    async getBlogById(id) {
        const blog = await Blog.findByPk(id, {
            attributes: { exclude: ["updatedAt"] }
        });
        if (!blog) throw createHttpError(404, BlogMessage.BLOG_NOT_FOUND);
        return blog
    }

    async updateBlogById(id, data) {
        const blog = await Blog.findByPk(id);
        if (!blog) throw createHttpError(404, BlogMessage.BLOG_NOT_FOUND);
        if (data.slug && data.slug !== blog.slug) {
            const exist = await Blog.findOne({ where: { slug: data.slug } });
            if (exist) throw createHttpError(400, BlogMessage.SLUG_ALREADY_EXISTS);
        }
        await blog.update(data);
        return blog;

    }

    async deleteBlogById(id) {
        const blog = await Blog.findByPk(id);
        if (!blog) throw createHttpError(404, BlogMessage.BLOG_NOT_FOUND);

        await blog.destroy();
        return true;
    }
}

export default new BlogService();
