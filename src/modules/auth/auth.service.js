import autoBind from "auto-bind";
import { User, OTP } from "../user/user.model.js";
import createHttpError from "http-errors";
import { AuthMessage } from "../../constant/messages.constant.js";
import { randomInt } from "crypto";

class AuthService {
    #userModel
    #otpModel

    constructor() {
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

    async checkExistByIdMobile(mobile) {
        const user = await this.#userModel.findOne({ where: { mobile } });
        if (!user) throw new createHttpError.NotFound(AuthMessage.USER_NOT_FOUND);
        return user;
    }
}

export default new AuthService();