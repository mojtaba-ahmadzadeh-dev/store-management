import Joi from "joi";
import createHttpError from "http-errors";

export const notficationValidation = Joi.object({
    title: Joi.string()
        .min(3)
        .max(200)
        .required()
        .error(createHttpError.BadRequest("عنوان اعلان نمی‌تواند خالی باشد یا کمتر از ۳ کاراکتر باشد")),

    message: Joi.string()
        .min(3)
        .max(2000)
        .required()
        .error(createHttpError.BadRequest("پیام اعلان نمی‌تواند خالی باشد یا کمتر از ۳ کاراکتر باشد")),

    user_id: Joi.number()
        .integer()
        .required()
        .error(createHttpError.BadRequest("شناسه کاربر معتبر نیست")),

    related_id: Joi.number()
        .integer()
        .allow(null)
        .error(createHttpError.BadRequest("شناسه مرتبط معتبر نیست")),

    type: Joi.string()
        .valid("info", "order", "comment", "product", "discount")
        .required()
        .error(createHttpError.BadRequest("نوع اعلان معتبر نیست")),
});
