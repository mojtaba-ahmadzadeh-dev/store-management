import autoBind from "auto-bind"
import productService from "./product.service.js";
import { AuthMessage, ProductMessage } from "../../constant/messages.constant.js";

class ProductController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = productService;
    }

    async createProduct(req, res, next) {
        try {
            const productData = { ...req.body };
            if (req.file) {
                productData.image = req.file.path.replace("public/", "");
            }

            const product = await this.#service.createProduct(productData)
            return res.status(201).json({
                message: ProductMessage.CREATE_PRODUCT_SUCCESS,
                data: product
            });
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const filters = (({ category_id, search, sort_by, page, limit }) =>
                ({ category_id, search, sort_by, page, limit }))(req.query);

            console.log('filtered: ', filters);
            

            const productsData = await this.#service.getAllProducts(filters);

            res.status(200).json({
                message: ProductMessage.GET_PRODUCTS_SUCCESS,
                products: productsData.products
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.#service.getProductById(id)
            return res.status(200).json({
                message: ProductMessage.GET_PRODUCT_SUCCESS,
                data: product
            });
        } catch (error) {
            next(error)
        }
    }

    async updateProductById(req, res, next) {
        try {
            const { id } = req.params;
            const updatedProduct = await this.#service.updateProductById(id, req.body)
            return res.status(200).json({
                message: ProductMessage.UPDATE_PRODUCT_SUCCESS,
                data: updatedProduct
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteProductById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.#service.deleteProductById(id)
            return res.status(200).json({
                success: true,
                message: ProductMessage.DELETE_PRODUCT_SUCCESS,
                result
            });
        } catch (error) {
            next(error)
        }
    }

    async toggleProductLike(req, res, next) {
        try {
            const { id } = req.params;
            const { count = 1 } = req.body;
            const updatedProduct = await this.#service.toggleProductLike(id, count)
            return res.status(200).json({
                message: count >= 0 ? ProductMessage.LIKE_PRODUCT_SUCCESS : ProductMessage.DISLIKE_PRODUCT_SUCCESS,
                data: updatedProduct
            });
        } catch (error) {
            next(error)
        }
    }

    async toggleProductBookmark(req, res, next) {
        try {
            const { id } = req.params;
            const updatedProduct = await this.#service.toggleProductBookmark(id)
            return res.status(200).json({
                message: updatedProduct.bookmarked
                    ? ProductMessage.BOOKMARK_PRODUCT_SUCCESS
                    : ProductMessage.UNBOOKMARK_PRODUCT_SUCCESS,
                data: updatedProduct
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController()