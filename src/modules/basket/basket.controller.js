// basket.controller.js
import autoBind from "auto-bind";
import { BasketMessage } from "../../constant/messages.constant.js";
import basketService from "./basket.service.js";

class BasketController {
    #service
    constructor() {
        autoBind(this);
        this.#service = basketService
    }

    async addToBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;

            const basketItem = await this.#service.addToBasket(userId, productId, quantity || 1);

            if (basketItem.remove) {
                return res.json({
                    message: BasketMessage.REMOVED_SUCCESS,
                    basketItem
                });
            }

            return res.json({
                message: BasketMessage.ADDED_SUCCESS,
                basketItem,
            });
        } catch (error) {
            next(error)
        }
    }

    async removeFromBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const { productId } = req.body;
            const result = await this.#service.removeFromBasket(userId, productId)
            return res.json({
                message: BasketMessage.REMOVED_SUCCESS,
                result
            });
        } catch (error) {
            next(error)
        }
    }

    async getUserBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const userBasket = await this.#service.getUserBasket(userId);
            return res.json({
                message: userBasket.message || BasketMessage.BASKET_USER,
                basket: userBasket
            });
        } catch (error) {
            next(error)
        }
    }

    async clearBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const result = await this.#service.clearBasket(userId)
            return res.json({
                message: result.removedCount > 0 ? BasketMessage.BASKET_CLEARED : BasketMessage.BASKET_ALREADY_EMPTY,
                result
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new BasketController();
