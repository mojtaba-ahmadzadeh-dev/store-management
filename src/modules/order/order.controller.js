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

    async getOrderById(req, res, next) {
        try {
            const userId = req.user.id;
            const orderId = req.params.id;

            const order = await this.#service.getOrderById(orderId, userId);

            res.json({
                message: OrderMessage.GET_ORDER_BY_ID_SUCCESS,
                order
            });
        } catch (error) {
            next(error)
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const orders = await this.#service.getAllOrders()

            res.json({
                message: OrderMessage.ADMIN_GET_ALL_ORDERS_SUCCESS,
                orders
            });
        } catch (error) {
            next(error)
        }
    }

    async updateOrder(req, res, next) {
        try {
            const userId = req.user.id;
            const orderId = req.params.id;
            const { shipping_address, payment_method, status } = req.body;
            const updatedOrder = await this.#service.updateOrder(orderId, userId, {
                shipping_address,
                payment_method,
                status
            })
            res.json({
                message: OrderMessage.ORDER_UPDATE_SUCCESS,
                order: updatedOrder
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const userId = req.user.id;
            const orderId = req.params.id;
            const isAdmin = req.user.role === "admin";
            const deletedOrder = await this.#service.deleteOrder(orderId, userId, isAdmin);
            res.json({
                message: OrderMessage.ORDER_DELETE_SUCCESS,
                order: deletedOrder
            });
        } catch (error) {
            next(error)
        }
    }

    async updateOrderStatus(req, res, next) {
        const userId = req.user.id;
        const orderId = req.params.id;
        const { status } = req.body;
        const isAdmin = req.user.role === "admin";
        const updatedOrder = await this.#service.updateOrderStatus(orderId, userId, status, isAdmin);
        res.json({
            message: OrderMessage.ORDER_UPDATE_SUCCESS,
            order: updatedOrder
        });
    }
}

export default new OrderController();