import autoBind from "auto-bind"
import { Product } from "./product.modle.js";

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
}

export default new ProductService()