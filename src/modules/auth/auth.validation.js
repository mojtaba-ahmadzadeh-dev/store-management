import Joi from "joi";
import { AuthMessage } from "../../constant/messages.constant.js";
import { validate } from "../../middlewares/validate/validate.js";


const sendOTPSchema = Joi.object({
    mobile: Joi.string()
        .pattern(/^09\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': AuthMessage.MOBILE_INVALID,
            'any.required': AuthMessage.MOBILE_REQUIRED
        }),
});

const checkOTPSchema = Joi.object({
    mobile: Joi.string()
        .pattern(/^09\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': AuthMessage.MOBILE_INVALID,
            'any.required': AuthMessage.MOBILE_REQUIRED
        }),
    code: Joi.string()
        .length(6)
        .pattern(/^\d{6}$/)
        .required()
        .messages({
            'string.pattern.base': AuthMessage.CODE_INVALID,
            'any.required': AuthMessage.CODE_REQUIRED,
            'string.length': AuthMessage.CODE_LENGTH_INVALID
        }),
});

export const validateSendOTP = validate(sendOTPSchema);
export const validateCheckOTP = validate(checkOTPSchema);