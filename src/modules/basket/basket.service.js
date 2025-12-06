import { Basket } from "./basket.model.js";
import { Product } from "../product/product.modle.js";
import autoBind from "auto-bind";
import createHttpError from "http-errors";
import { BasketMessage } from "../../constant/messages.constant.js";

class BasketService {
    constructor() {
        autoBind(this);
    }

    /**
     * Add product to user's basket
     */
    async addToBasket(userId, productId, quantity = 1) {
        const userIdNum = +userId;
        const productIdNum = +productId;
        const quantityNum = +quantity;

        // پیدا کردن محصول
        const product = await Product.findByPk(productIdNum);
        if (!product) throw createHttpError(404, BasketMessage.PRODUCT_NOT_FOUND);

        // بررسی وجود محصول در سبد
        let basketItem = await Basket.findOne({
            where: { user_id: userIdNum, product_id: productIdNum },
        });

        if (basketItem) {
            basketItem.quantity += quantityNum;

            if (basketItem.quantity <= 0) {
                await basketItem.destroy();
                return { remove: true };
            }

            basketItem.total_price = Number((basketItem.quantity * product.price).toFixed(2));
            await basketItem.save();
        } else {
            if (quantityNum <= 0) {
                throw createHttpError(400, BasketMessage.INVALID_NEGATIVE_QUANTITY);
            }

            basketItem = await Basket.create({
                user_id: userIdNum,
                product_id: productIdNum,
                quantity: quantityNum,
                total_price: Number((quantityNum * product.price).toFixed(2)),
            });
        }

        return this._formatBasketItem(basketItem);
    }

    /**
     * Remove product from basket by ID
     */
    async removeFromBasketById(userId, productId) {
        const basketItem = await Basket.findOne({
            where: { user_id: +userId, product_id: +productId }
        });

        if (!basketItem) throw createHttpError(404, BasketMessage.PRODUCT_NOT_FOUND);

        await basketItem.destroy();
        return { removed: true };
    }

    /**
     * Get user's basket with products
     */
    async getUserBasket(userId) {
        const basketItems = await Basket.findAll({
            where: { user_id: +userId },
            include: [
                {
                    model: Product,
                    as: 'product', // حتماً همانند تعریف model
                    attributes: ['id', 'name', 'price', 'description']
                }
            ]
        });

        if (!basketItems || basketItems.length === 0) {
            return { items: [], totalPrice: 0, message: BasketMessage.BASKET_EMPTY };
        }

        let totalPrice = 0;
        const items = basketItems.map(item => {
            const total = item.total_price ?? (item.quantity * (item.product?.price || 0));
            totalPrice += total;

            return {
                id: +item.id,
                user_id: +item.user_id,
                product_id: +item.product_id,
                quantity: +item.quantity,
                total_price: +total.toFixed(2),
                product: item.product ?? null
            };
        });

        return { items, totalPrice: +totalPrice.toFixed(2) };
    }

    /**
     * Remove all products from user's basket
     */
    async removeFromBasket(userId) {
        const deletedCount = await Basket.destroy({
            where: { user_id: +userId }
        });

        return { removedCount: deletedCount };
    }

    /**
     * Format basket item
     */
    _formatBasketItem(item) {
        const basket = item.toJSON();
        basket.id = +basket.id;
        basket.user_id = +basket.user_id;
        basket.product_id = +basket.product_id;
        basket.quantity = +basket.quantity;
        basket.total_price = +basket.total_price.toFixed(2);
        return basket;
    }
}

export default new BasketService();
