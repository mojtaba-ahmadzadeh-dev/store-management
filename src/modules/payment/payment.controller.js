import createHttpError from "http-errors";
import paymentService from "./payment.service.js";

class PaymentController {

    async paymentBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const user = req.user;
            const result = await paymentService.paymentBasket(userId, user);

            return res.json({
                success: true,
                message: 'پرداخت ایجاد شد',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async paymentVerify(req, res, next) {
        const { Status, Authority } = req.query;

        try {
            if (!Authority || Status !== 'OK') {
                return res.send("<h1>پرداخت ناموفق ❌ یا لغو شده</h1>");
            }

            const result = await paymentService.paymentVerify(Status, Authority);

            return res.send(`
                <h1>پرداخت موفق ✅</h1>
                <p>مبلغ: ${result.amount.toLocaleString()} تومان</p>
                <p>شماره تراکنش: ${result.ref_id}</p>
            `);
        } catch (err) {
            return res.send(`<h1>خطا: ${err.message}</h1>`);
        }
    }

}

export default new PaymentController();
