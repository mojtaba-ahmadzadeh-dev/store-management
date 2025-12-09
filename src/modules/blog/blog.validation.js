import Joi from "joi";
import createHttpError from "http-errors";

export const blogValidation = Joi.object({
    title: Joi.string()
        .min(3)
        .max(255)
        .required()
        .error(createHttpError.BadRequest("عنوان بلاگ نمی‌تواند خالی باشد")),

    summary: Joi.string()
        .min(3)
        .max(500)
        .allow(null, "")
        .error(createHttpError.BadRequest("خلاصه بلاگ صحیح نمی‌باشد")),

    content: Joi.string()
        .min(10)
        .required()
        .error(createHttpError.BadRequest("محتوای بلاگ نمی‌تواند خالی باشد")),

    thumbnail: Joi.string()
        .allow(null, "")
        .error(createHttpError.BadRequest("فرمت تصویر صحیح نمی‌باشد")),

    slug: Joi.string()
        .min(3)
        .max(255)
        .required()
        .error(createHttpError.BadRequest("اسلاگ بلاگ معتبر نمی‌باشد")),

    status: Joi.string()
        .valid("draft", "published")
        .required()
        .error(createHttpError.BadRequest("وضعیت بلاگ معتبر نیست")),

    category_id: Joi.number()
        .allow(null)
        .error(createHttpError.BadRequest("دسته‌بندی بلاگ معتبر نیست")),

    author_id: Joi.number()
        .required()
        .error(createHttpError.BadRequest("نویسنده بلاگ معتبر نیست")),
});
