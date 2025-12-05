// basket.controller.js
import autoBind from "auto-bind";
import BasketService from "./basket.service.js";
import { BasketMessage } from "../../constant/messages.constant.js";

class BasketController {
    constructor() {
        autoBind(this);
    }

    async addToBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;

            const basketItem = await BasketService.addToBasket(userId, productId, quantity || 1);

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
