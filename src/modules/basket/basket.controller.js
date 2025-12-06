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


}

export default new BasketController();
