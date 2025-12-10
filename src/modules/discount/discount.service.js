import autoBind from "auto-bind"
import { Discount } from "./discount.model.js";
import createHttpError from "http-errors";
import { DiscountMessage } from "../../constant/messages.constant.js";

class DiscountService {
    #model
    constructor() {
        autoBind(this)
        this.#model = Discount;
    }

    async create(data) {
        const exists = await this.#model.findOne({ where: { code: data.code } });
        if (exists) {
            throw createHttpError(400, DiscountMessage.DUPLICATE)
        }
        return await this.#model.create(data);
    }

    async getAllDiscount() {
        return await this.#model.findAll({
            order: [["createdAt", "DESC"]],
        });
    }
}

export default new DiscountService()