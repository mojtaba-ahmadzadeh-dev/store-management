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
}

export default new CategoryController