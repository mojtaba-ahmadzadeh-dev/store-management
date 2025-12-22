
import { Payment } from "./payment.model.js";
import { Order, OrderItem } from "../order/order.model.js";
import { OrderStatus } from "../../constant/order_status.constant.js";
import basketService from "../basket/basket.service.js";
import zarinpalService from "../services/zarinpal.service.js";
import createHttpError from "http-errors";
import { Basket } from "../basket/basket.model.js";
import { PaymentStatus } from "../../constant/payment_status.constant.js";

class PaymentService {

    async paymentBasket(userId, user) {
        const userBasket = await basketService.getUserBasket(userId);
        const basket = userBasket.items;
        const total_price = userBasket.totalPrice;
        const final_amount = total_price;

        if (!basket || basket.length === 0) {
            throw new Error("سبد خرید خالی است");
        }

        const order = await Order.create({
            user_id: userId,
            total_price,
            final_amount,
            status: OrderStatus.PENDING,
            shipping_address: 'kuzestan andimeshk resalat'
        });

        const payment = await Payment.create({
            order_id: order.id,
            user_id: userId,
            amount: final_amount,
            method: "online",
            status: OrderStatus.PENDING,
            authority: 'temp'
        });

        order.payment_id = payment.id;
        await order.save();

        const orderItems = basket.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.product.price,
            total_price: item.total_price
        }));

        await OrderItem.bulkCreate(orderItems);

        const result = await zarinpalService.zarinpalRequest(payment.amount, user);

        payment.authority = result?.authority;
        await payment.save();

        return result;
    }

    async paymentVerify(status, authority) {
        try {
            if (status === 'OK' && authority) {
                const payment = await Payment.findOne({ where: { authority } });
                if (!payment) throw createHttpError(404, 'پرداخت یافت نشد');

                const result = await zarinpalService.zarinpalVerify(payment.amount, authority);

                payment.status = PaymentStatus.SUCCESS;
                payment.transaction_id = result.ref_id ?? '32435';
                await payment.save();

                const order = await Order.findByPk(payment.order_id);
                if (!order) throw createHttpError(404, 'سفارش یافت نشد');

                order.status = OrderStatus.IN_PROGRESS;

                await order.save();
                await payment.save();
                await Basket.destroy({ where: { user_id: order.user_id } });

                return {
                    success: true,
                    amount: payment.amount,
                    ref_id: result.ref_id,
                    code: result.code,
                };
            } else {
                return { success: false };
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new PaymentService();
