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

    async getDiscountById({ id, code }) {
        const where = {};
        if (id) where.id = id;
        if (code) where.code = code;

        if (!Object.keys(where).length) {
            throw createHttpError(400, DiscountMessage.ID_OR_CODE_REQUIRED);
        }

        const discount = await this.#model.findOne({ where });

        if (!discount) {
            throw createHttpError(404, DiscountMessage.NOT_FOUND);
        }

        return discount;
    }

    async updateDiscountById({ id }, data) {
        const discount = await this.getDiscountById({ id });

        if (data.code && data.code !== discount.code) {
            const exists = await this.#model.findOne({ where: { code: data.code } });
            if (exists) throw createHttpError(400, DiscountMessage.DUPLICATE);
        }

        await discount.update(data);
        return discount;
    }

    async deleteAllDiscounts() {
        const deletedCount = await this.#model.destroy({ where: {} });
        return deletedCount;
    }

    async deleteDiscountById({id}) {
        if (!id) throw createHttpError(400, DiscountMessage.ID_REQUIRED);

        const discount = await this.getDiscountById({ id });
        await discount.destroy();

        return discount;
    }
}

export default new DiscountService()