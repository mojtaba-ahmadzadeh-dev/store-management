import Joi from "joi";
import createHttpError from "http-errors";

export const createPermissionValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .error(createHttpError.BadRequest("نام دسترسی معتبر نیست یا خالی است")),
    description: Joi.string()
        .min(0)
        .max(500)
        .allow(null) 
        .allow('') 
        .error(createHttpError.BadRequest("توضیحات دسترسی معتبر نیست"))
});

export const createRoleValidation = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .error(createHttpError.BadRequest("عنوان نقش معتبر نیست یا خالی است")),
    description: Joi.string()
        .min(0)
        .max(500)
        .allow(null)
        .allow('')
        .error(createHttpError.BadRequest("توضیحات نقش معتبر نیست")),
    permissionIds: Joi.array()
        .items(Joi.number().integer())
        .default([])   
        .error(createHttpError.BadRequest("لیست دسترسی‌ها معتبر نیست"))
});

export const updateRoleValidation = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .error(createHttpError.BadRequest("عنوان نقش معتبر نیست")),
    description: Joi.string()
        .min(0)
        .max(500)
        .optional()
        .allow(null)
        .allow('')
        .error(createHttpError.BadRequest("توضیحات نقش معتبر نیست")),
    permissionIds: Joi.array()
        .items(Joi.number().integer())
        .optional()
        .default([])
        .error(createHttpError.BadRequest("لیست دسترسی‌ها معتبر نیست"))
});

export const assignPermissionToRoleValidation = Joi.object({
    roleId: Joi.number()
        .integer()
        .required()
        .error(createHttpError.BadRequest("شناسه نقش معتبر نیست")),
    permissions: Joi.array()
        .items(Joi.number().integer())
        .required()
        .error(createHttpError.BadRequest("لیست دسترسی‌ها معتبر نیست"))
});