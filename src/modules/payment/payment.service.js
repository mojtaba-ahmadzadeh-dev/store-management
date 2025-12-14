import { Payment } from "./payment.model.js"
import { Order, OrderItem } from "../order/order.model.js";
import { OrderStatus } from "../../constant/order_status.constant.js";
import basketService from "../basket/basket.service.js";

class PaymentService {
    constructor() {

    }

    async paymentBasket(userId) {
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
            amount: final_amount,
            method: "online",
            status: OrderStatus.PENDING
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

        const paymentUrl = `https://zarinpal.com/payment/${payment.id}`;
        return { order, orderItems, payment: paymentUrl };
    }

}

export default new PaymentService()