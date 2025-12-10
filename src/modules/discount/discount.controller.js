import autoBind from "auto-bind"
import discountService from "./discount.service.js";
import createHttpError from "http-errors";
import { DiscountMessage } from "../../constant/messages.constant.js";

class DiscountController {
    #service
    constructor() {
        autoBind(this)
        this.#service = discountService;
    }
    async create(req, res, next) {
        try {
            const { code, percentage, max_usage, expire_at, product_id, user_id } = req.body;
            if (!code || !percentage) throw createHttpError(400, DiscountMessage.REQUIRED_FIELDS);

            const discount = await this.#service.create({
                code,
                percentage,
                max_usage,
                expire_at,
                product_id,
                user_id
            });
            return res.status(201).json({
                message: DiscountMessage.CREATED,
                data: discount
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new DiscountController()