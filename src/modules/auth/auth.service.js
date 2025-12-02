import autoBind from "auto-bind";
import { User, OTP } from "../user/user.model.js";
import createHttpError from "http-errors";
import { AuthMessage } from "../../constant/messages.constant.js";
import { randomInt } from "crypto";
import jwt from 'jsonwebtoken'

class AuthService {
    #userModel
    #otpModel

    constructor() {
        autoBind(this)
        this.#userModel = User;
        this.#otpModel = OTP;
    }

    async sendOTP(mobile) {
        const now = new Date();
        const user = await this.#userModel.findOne({ where: { mobile } });

        const code = randomInt(100000, 999999);
        const expires_in = new Date(now.getTime() + 2 * 60 * 1000);

        let userId;
        if (!user) {
            const newUser = await this.#userModel.create({ mobile });
            userId = newUser.id;
        } else {
            userId = user.id;
        }

        await this.#otpModel.destroy({ where: { user_id: userId } });

        const otp = await this.#otpModel.create({
            user_id: userId,
            code: code.toString(),
            expires_in
        });

        return { mobile, otp };
    }

    async checkOTP(mobile, code) {
        const now = new Date();
        const user = await this.#userModel.findOne({ where: { mobile } });
        if (!user) throw new createHttpError.NotFound(AuthMessage.USER_NOT_FOUND);

        const otp = await this.#otpModel.findOne({
            where: { user_id: user.id },
            order: [["created_at", "DESC"]]
        });

        if (!otp) throw new createHttpError.BadRequest(AuthMessage.OTP_CODE_NOT_FOUND);
        if (otp.code !== code) throw new createHttpError.BadRequest(AuthMessage.OTP_CODE_INCORRECT);
        if (otp.expires_in < now) throw new createHttpError.BadRequest(AuthMessage.OTP_CODE_EXPIRED);

        await otp.destroy();

        const { accessToken, refreshToken } = this.generateTokens({ userId: user.id })

        return { user, accessToken, refreshToken };
    }

    generateTokens(payload) {
        const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }

    async verifyRefreshToken(token) {
        try {
            const { REFRESH_TOKEN_SECRET } = process.env;

            const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);

            if (!payload?.userId) {
                throw new createHttpError.Unauthorized(AuthMessage.REFRESH_TOKEN_INVALID);
            }

            const { accessToken, refreshToken } = this.generateTokens({ userId: payload.userId });

            return { accessToken, refreshToken };

        } catch (error) {
            throw new createHttpError.Unauthorized(AuthMessage.REFRESH_TOKEN_EXPIRED);
        }
    }
}

export default new AuthService();