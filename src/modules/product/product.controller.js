import autoBind from "auto-bind"
import productService from "./product.service.js";
import { ProductMessage } from "../../constant/messages.constant.js";

class ProductController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = productService;
    }

    async createProduct(req, res, next) {
        try {
            const product = await this.#service.createProduct(req.body)
            return res.status(201).json({
                message: ProductMessage.CREATE_PRODUCT_SUCCESS,
                data: product
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController()