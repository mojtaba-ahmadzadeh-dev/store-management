import autoBind from "auto-bind"
import { Product } from "./product.modle.js";
import createHttpError from "http-errors";
import { ProductMessage } from "../../constant/messages.constant.js";
import { Op } from "sequelize";

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

    async getAllProducts(filters = {}) {
        try {
            const { category_id, min_likes, max_likes, sort_by = "createdAt", order = "DESC" } = filters;
            const where = {};

            if (category_id) where.category_id = category_id;
            if (min_likes) where.likes = { ...(where.likes || {}), [Op.gte]: Number(min_likes) };
            if (max_likes) where.likes = { ...(where.likes || {}), [Op.lte]: Number(max_likes) };

            const products = await this.#model.findAll({
                where,
                order: [[sort_by, order.toUpperCase()]],
            })

            if (!products || products.length === 0) {
                throw createHttpError(404, ProductMessage.NO_PRODUCTS_FOUND);
            }

            return products
        } catch (error) {
            throw new Error(`Get products failed: ${error.message}`);
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

    async updateProductById(id, data) {
        try {
            const product = await this.#model.findByPk(id)
            if (!product) throw createHttpError(404, ProductMessage.PRODUCT_NOT_FOUND);
            const allowedFields = ["name", "description", "price", "status", "category_id"];
            const updatedFields = Object.fromEntries(
                Object.entries(data).filter(([key, value]) => allowedFields.includes(key) && value !== undefined)
            );
            await product.update(updatedFields);

            return product;

        } catch (error) {
            throw new Error(`Update product failed: ${error.message}`);
        }
    }

    async deleteProductById(id) {
        const product = await this.#model.findByPk(id)
        if (!product) throw createHttpError(404, ProductMessage.PRODUCT_NOT_FOUND)
        await product.destroy()
        return product
    }

    async toggleProductLike(id, count = 1) {
        try {
            const product = await this.#model.findByPk(id)
            if (!product) throw createHttpError(404, ProductMessage.PRODUCT_NOT_FOUND);

            product.likes += count;

            if (product.likes < 0) product.likes = 0;

            await product.save()
            return product
        } catch (error) {
            throw new Error(`Like/Dislike product failed: ${error.message}`);
        }
    }
}

export default new ProductService()