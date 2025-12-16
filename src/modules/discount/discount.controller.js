import autoBind from "auto-bind"
import discountService from "./discount.service.js";
import createHttpError from "http-errors";
import { CommentMessage, DiscountMessage } from "../../constant/messages.constant.js";

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

    async getAllDiscount(req, res, next) {
        try {
            const discounts = await this.#service.getAllDiscount();
            return res.status(200).json({
                message: DiscountMessage.LIST_FETCHED,
                data: discounts
            });
        } catch (error) {
            next(error)
        }
    }

    async getDiscountById(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) throw createHttpError(400, DiscountMessage.ID_OR_CODE_REQUIRED);

            const isNumber = !isNaN(Number(id));
            const discount = await this.#service.getDiscountById({
                id: isNumber ? Number(id) : undefined,
                code: !isNumber ? id : undefined
            });

            return res.status(200).json({
                message: DiscountMessage.FETCHED,
                data: discount
            });
        } catch (error) {
            next(error);
        }
    }

    async updateDiscountById(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (!id) throw createHttpError(400, DiscountMessage.ID_OR_CODE_REQUIRED);

            const updatedDiscount = await this.#service.updateDiscountById(
                { id: Number(id) },
                data
            );

            return res.status(200).json({
                message: DiscountMessage.UPDATED,
                data: updatedDiscount
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteAllDiscounts(req, res, next) {
        try {
            const deletedCount = await this.#service.deleteAllDiscounts();
            return res.status(200).json({
                message: CommentMessage.DELETED_COMMENT_SUCCESS,
                data: { deletedCount }
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteDiscountById(req, res, next) {
        try {
            const { id } = req.params;
            const deletedDiscount = await this.#service.deleteDiscountById({ id: Number(id) });

            return res.status(200).json({
                message: DiscountMessage.DELETE_DISCOUNT_ONE_SUCCESS,
                data: deletedDiscount
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new DiscountController()