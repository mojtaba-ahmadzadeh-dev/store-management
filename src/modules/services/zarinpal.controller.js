import { PaymentMessage } from "../../constant/messages.constant.js";
import zarinpalService from "./zarinpal.service.js";
import ZarinpalService from "./zarinpal.service.js";

class ZarinpalController {
  constructor() { }

  async zarinpalRequest(req, res, next) {
    try {
      const { amount, user, description } = req.body;
      const payment = await ZarinpalService.zarinpalRequest(amount, user, description);
      return res.json(payment)
    } catch (error) {
      next(error)
    }
  }

  async zarinpalVerify(req, res, next) {
    try {
      const { Authority, Status } = req.query;

      if (!Authority || Status !== 'OK') {
        return res.status(400).json({
          success: false,
          message: PaymentMessage.PAYMENT_CANCELLED_BY_USER
        });
      }

      const amount = req.amount;

      await zarinpalService.zarinpalVerify(amount, Authority);

      return res.json({
        success: true,
        message: PaymentMessage.PAYMENT_SUCCESS
      })
    } catch (error) {
      next(error)
    }
  }
  
}

export default new ZarinpalController();