import autoBind from "auto-bind"
import { Product } from "./product.modle.js";
import createHttpError from "http-errors";
import { ProductMessage } from "../../constant/messages.constant.js";

class ProductService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = Product;
    }

    async createProduct(data) {
        try {
            const product = await this.#model.create({
                name: data.name,
                description: data.description,
                price: data.price,
                stats: data.status,
                category_id: data.category_id
            })
            return product
        } catch (err) {
            throw new Error(`Create product failed: ${err.message}`);
        }
    }

    async getAllProducts() {
        try {
            const products = await this.#model.findAll()
            return products
        } catch (error) {
            throw new Error(`Get products failed: ${err.message}`);
        }
    }

    async getProductById(id) {
        try {
            const product = await this.#model.findByPk(id)
            if (!product) throw createHttpError(404, ProductMessage.PRODUCT_NOT_FOUND)
            return product
        } catch (error) {
            throw new Error(`Get product failed: ${err.message}`);
        }
    }

    async deleteProductById(id) {
        const product = await this.#model.findByPk(id)
        if (!product) throw createHttpError(404, ProductMessage.PRODUCT_NOT_FOUND)
        await product.destroy()
        return product
    }
}

export default new ProductService()