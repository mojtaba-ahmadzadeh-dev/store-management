import Joi from "joi";
import createHttpError from "http-errors";
import { CATEGORY_STATUS } from "../../constant/category_status.constant.js";

export const productValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .error(createHttpError.BadRequest("نام محصول نمی‌تواند خالی باشد")),

    description: Joi.string()
        .min(3)
        .max(1000)
        .allow(null, "")
        .error(createHttpError.BadRequest("توضیحات صحیح نمی‌باشد")),

    price: Joi.number()
        .min(0)
        .required()
        .error(createHttpError.BadRequest("قیمت وارد شده صحیح نمی‌باشد")),

    status: Joi.string()
        .valid(CATEGORY_STATUS.ACTIVE, CATEGORY_STATUS.INACTIVE)
        .required()
        .error(createHttpError.BadRequest("وضعیت محصول معتبر نیست")),

    category_id: Joi.number()
        .required()
        .error(createHttpError.BadRequest("دسته‌بندی محصول معتبر نیست")),

    image: Joi.string()
        .allow(null, "")
        .error(createHttpError.BadRequest("فرمت تصویر معتبر نیست")),
});