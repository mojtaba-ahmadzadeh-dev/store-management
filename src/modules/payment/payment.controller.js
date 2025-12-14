import paymentService from "./payment.service.js";

class PaymentController {
    constructor() {

    }
    async paymentBasket(req, res, next) {
        try {
            console.log("req.user:", req.user);
            const userId = req.user.id;
            const user = req.user;
            const result = await paymentService.paymentBasket(userId, user);
            return res.json({
                success: true,
                message: 'پرداخت ایجاد شد',
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new PaymentController()