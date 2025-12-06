import autoBind from "auto-bind";
import orderService from "./order.service.js";
import { OrderMessage } from "../../constant/messages.constant.js";

class OrderController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = orderService;
    }

    async createOrder(req, res, next) {
        try {
            const userId = req.user.id;
            const { shipping_address, payment_method } = req.body;

            const result = await this.#service.createOrder(userId, { shipping_address, payment_method });

            return res.json({
                message: OrderMessage.ORDER_SUCCESS,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserOrders(req, res, next) {
        try {
            const userId = req.user.id;
            const orders = await this.#service.getUserOrders(userId)
            res.json({
                message: OrderMessage.GET_ORDERS_SUCCESS,
                orders
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new OrderController();