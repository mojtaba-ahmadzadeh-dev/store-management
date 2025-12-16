import autoBind from "auto-bind";
import { Order, OrderItem } from "./order.model.js";
import BasketService from "../basket/basket.service.js";
import { sequelize } from "../../configs/sequelize.config.js";
import { OrderMessage } from "../../constant/messages.constant.js";
import createHttpError from "http-errors";

class OrderService {
    constructor() {
        autoBind(this);
    }

    async createOrder(userId, { shipping_address, payment_method }) {
        const basket = await BasketService.getUserBasket(userId);

        if (!basket || basket.items.length === 0) {
            throw new Error(OrderMessage.ORDER_EMPTY_BASKET);
        }

        const total_price = basket.items.reduce((sum, item) => {
            const price = item.product?.price ?? 0;
            return sum + item.quantity * price;
        }, 0);

        const t = await sequelize.transaction();

        try {
            const order = await Order.create(
                { user_id: userId, total_price, payment_method, shipping_address },
                { transaction: t }
            );

            const orderItems = basket.items.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.product?.price ?? 0,
                total_price: (item.product?.price ?? 0) * item.quantity
            }));

            await OrderItem.bulkCreate(orderItems, { transaction: t });

            await BasketService.removeFromBasket(userId);

            await t.commit();

            return { order, items: orderItems };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async getUserOrders(userId) {
        const orders = await Order.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: OrderItem,
                    attributes: ['product_id', 'quantity', 'price', 'total_price']
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        return orders
    }

    async getOrderById(orderId, userId) {
        const order = await Order.findOne({
            where: { id: orderId, user_id: userId },
            include: [
                {
                    model: OrderItem,
                    attributes: ["product_id", "quantity", "price", "total_price"]
                }
            ]
        })
        if (!order) {
            throw new Error(OrderMessage.ORDER_NOT_FOUND);
        }
        return order
    }

    async getAllOrders() {
       const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    as: "order_items",
                    attributes: ['product_id', 'quantity', 'price', 'total_price']
                }
            ],
            order: [["createdAt", "DESC"]]
        });
           return orders || [];
    }

    async updateOrder(orderId, userId, { shipping_address, payment_method, status }) {
        const order = await Order.findOne({ where: { id: orderId, user_id: userId } })
        if (!order) throw createHttpError(404, OrderMessage.ORDER_NOT_FOUND);

        if (shipping_address !== undefined) order.shipping_address = shipping_address;
        if (payment_method !== undefined) order.payment_method = payment_method;
        if (status !== undefined) order.status = status;

        await order.save();
        return order;
    }

    async deleteOrder(orderId, userId, isAdmin = false) {
        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) throw createHttpError(404, OrderMessage.ORDER_NOT_FOUND);

        if (!isAdmin && order.user_id !== userId) {
            throw createHttpError(403, OrderMessage.ORDER_NOT_AUTHORIZED);
        }
        await order.destroy();
        return order;
    }

    async updateOrderStatus(orderId, userId, status, isAdmin = false) {
        const order = await Order.findOne({ where: { id: orderId } })
        if (!order) throw createHttpError(404, OrderMessage.ORDER_NOT_FOUND);
        if (!isAdmin && order.user_id !== userId) {
            throw createHttpError(403, OrderMessage.ORDER_NOT_AUTHORIZED);
        }
        order.status = status;
        await order.save()
        return order
    }

    async getOrdersByStatus(status) {
        const whereClause = {}
        if (status) whereClause.status = status;
        return await Order.findAll({
            where: whereClause,
            include: [
                {
                    model: OrderItem,
                    as: "order_items",
                    attributes: ['product_id', 'quantity', 'price', 'total_price']
                }
            ],
            order: [["createdAt", "DESC"]]
        })
    }
}

export default new OrderService();