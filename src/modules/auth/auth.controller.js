import autoBind from "auto-bind"
import authService from "./auth.service.js";
import { AuthMessage } from "../../constant/messages.constant.js";
import createHttpError from "http-errors";

class AuthController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = authService
    }
    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            if (!mobile) throw createHttpError(400, AuthMessage.MOBILE_REQUIRED)
            const result = await this.#service.sendOTP(mobile)
            return res.json({
                message: AuthMessage.OTP_SENT_SUCCESS,
                result
            })
        } catch (error) {
            next(error)
        }
    }
    async checkOTP(req, res, next) {
        try {
            const { mobile, code } = req.body;
            if (!mobile) throw createHttpError(400, AuthMessage.MOBILE_REQUIRED)
            if (!code) throw createHttpError(400, AuthMessage.CODE_REQUIRED)
            const result = await this.#service.checkOTP(mobile, code)
            return res.json({
                message: AuthMessage.OTP_VERIFIED_SUCCESS,
                result
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()