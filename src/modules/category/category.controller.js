import autoBind from "auto-bind"
import categoryService from "./category.service.js";
import { CategoryMessage } from "../../constant/messages.constant.js";

class CategoryController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = categoryService;
    }

    async createCategory(req, res, next) {
        try {
            const { title, description, status } = req.body;
            if (!title) {
                return res.status(400).json({ message: CategoryMessage.CATEGORY_TITLE_REQUIRED });
            }
            const category = await this.#service.createCategory({ title, description, status })
            return res.status(201).json({
                message: CategoryMessage.CATEGORY_CREATED_SUCCESS,
                data: category
            });
        } catch (error) {
            next(error)
        }
    }

    async getAllCategories(req, res, next) {
        try {
            const categories = await this.#service.getAllCategories()
            return res.status(200).json({
                message: CategoryMessage.CATEGORY_LIST_RETRIEVED_SUCCESS,
                data: categories
            });
        } catch (error) {
            next(error)
        }
    }

    async getCategoryById(req, res, next) {
        const { id } = req.params;
        const category = await this.#service.getCategoryById(id)
        return res.status(200).json({
            message: CategoryMessage.CATEGORY_RETRIEVED_SUCCESS,
            data: category
        });
    }
}

export default new CategoryController