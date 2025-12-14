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
}

export default new ZarinpalController();