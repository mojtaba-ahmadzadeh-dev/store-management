import autoBind from "auto-bind"
import { Category } from "./category.model.js";
import { CategoryMessage } from "../../constant/messages.constant.js";
import { CATEGORY_STATUS } from "../../constant/category_status.constant.js";
import createHttpError from "http-errors";

class CategoryService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = Category
    }

    async createCategory(data) {
        const existing = await this.#model.findOne({
            where: { title: data.title }
        })
        if (existing) {
            throw new Error(CategoryMessage.CATEGORY_ALREADY_EXISTS);
        }

        const category = await Category.create({
            title: data.title,
            description: data.description || null,
            status: data.status || CATEGORY_STATUS.ACTIVE
        });

        return category
    }

    async getAllCategories() {
        const categories = await this.#model.findAll({
            order: [["id", "ASC"]]
        })
        return categories
    }

    async getCategoryById(id) {
        const category = await this.#model.findByPk(id)
        if (!category) {
            throw createHttpError(404, CategoryMessage.CATEGORY_NOT_FOUND);
        }
        return category
    }

    async deleteCategoryById(id) {
        const category = await this.#model.findOne({ where: { id } });
        if (!category) throw createHttpError(404, CategoryMessage.CATEGORY_NOT_FOUND)
            
        await category.destroy();
        return category
    }
}

export default new CategoryService