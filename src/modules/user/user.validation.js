import Joi from "joi";
import { validate } from "../../middlewares/validate/validate.js";

const updateUserSchema = Joi.object({
    mobile: Joi.string().pattern(/^09\d{9}$/).messages({
        "string.pattern.base": "شماره موبایل نامعتبر است"
    }),
    full_name: Joi.string().max(255),
    avatar: Joi.string().uri().allow(null, "")
});

const changeRoleSchema = Joi.object({
    role: Joi.string().valid("user", "admin").required().messages({
        "any.only": "نقش وارد شده معتبر نیست",
        "any.required": "نقش الزامی است"
    })
});

export const validateUpdateUser = validate(updateUserSchema);
export const validateChangeUserRole = validate(changeRoleSchema);