import { Basket } from "./basket.model.js";
import { Product } from "../product/product.modle.js";
import autoBind from "auto-bind";
import createHttpError from "http-errors";
import { BasketMessage, ProductMessage } from "../../constant/messages.constant.js";

class BasketService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = Product;
    }
    async addToBasket(userId, productId, quantity = 1) {
        const userIdNum = +userId;
        const productIdNum = +productId;
        const quantityNum = +quantity;

        const product = await this.#model.findByPk(productIdNum);
        if (!product) throw createHttpError(404, BasketMessage.PRODUCT_NOT_FOUND);

        let basketItem = await Basket.findOne({
            where: { user_id: userIdNum, product_id: productIdNum },
        });

        if (basketItem) {
            basketItem.quantity += quantityNum;
            if (basketItem.quantity <= 0) {
                await basketItem.destroy()
                return { remove: true }
            }
            basketItem.total_price = Number((basketItem.quantity * product.price).toFixed(2));
            await basketItem.save();
        } else {
            if (quantityNum < 0) {
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

    _formatBasketItem(item) {
        const basket = item.toJSON();
        basket.id = +basket.id;
        basket.user_id = +basket.user_id;
        basket.product_id = +basket.product_id;
        basket.quantity = +basket.quantity;
        basket.total_price = +basket.total_price.toFixed(2);
        return basket;
    }

    async removeFromBasket(userId, productId) {
        const userIdNum = +userId;
        const productIdNum = +productId;

        const basketItm = await Basket.findOne({
            where: { user_id: userIdNum, product_id: productIdNum }
        })

        if (!basketItm) throw createHttpError(404, BasketMessage.PRODUCT_NOT_FOUND)

        await basketItm.destroy()

        return { remove: true }
    }
}

export default new BasketService();