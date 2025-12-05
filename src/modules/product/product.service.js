import autoBind from "auto-bind"
import { Product } from "./product.modle.js";
import createHttpError from "http-errors";
import { ProductMessage } from "../../constant/messages.constant.js";
import { Op } from "sequelize";
import { getPagingData, getPagination } from "../../utils/pagination.utils.js";

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
                category_id: data.category_id,
                image: data.image || null,
            })
            return product
        } catch (err) {
            throw new Error(`Create product failed: ${err.message}`);
        }
    }

    async getAllProducts(filters = {}) {
        try {
            const { page = 1, limit = 10, search, category_id, sort_by } = filters;

            const where = {};
            if (category_id) where.category_id = category_id;
            if (search) where.name = { [Op.like]: `%${search}%` };

            const { currentPage, perPage, offset } = getPagination(page, limit);

            let order = [['id', 'ASC']];
            if (sort_by === 'latest') order = [['createdAt', 'DESC']];
            if (sort_by === 'oldest') order = [['createdAt', 'ASC']];

            const result = await this.#model.findAndCountAll({
                where,
                limit: perPage,
                offset,
                order
            });

            if (result.count === 0) {
                throw createHttpError(404, ProductMessage.PRODUCT_NOT_FOUND); 
            }

            return getPagingData(result.count, currentPage, perPage, result.rows);
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

    async toggleProductBookmark(id) {
        try {
            const product = await this.#model.findByPk(id)
            if (!product) throw createHttpError(404, ProductMessage.PRODUCT_NOT_FOUND);

            if (product.bookmarked === undefined) product.bookmarked = false;

            product.bookmarked = !product.bookmarked;

            await product.save()
            return product
        } catch (error) {
            throw new Error(`Bookmark product failed: ${error.message}`);
        }
    }
}

export default new ProductService()