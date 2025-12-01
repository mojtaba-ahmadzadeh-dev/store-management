import autoBind from "auto-bind"
import authService from "./auth.service.js";
import { AuthMessage } from "../../constant/messages.constant.js";
import createHttpError from "http-errors";

class AuthController {
    #service;
    constructor() {
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
}

export default new AuthController()