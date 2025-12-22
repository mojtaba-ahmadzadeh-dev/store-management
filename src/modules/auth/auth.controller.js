// auth.controller.js
import autoBind from "auto-bind";
import authService from "./auth.service.js";
import { AuthMessage } from "../../constant/messages.constant.js";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";

config()

class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    }

    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            await this.#service.sendOTP(mobile);

            return res.json({
                message: AuthMessage.OTP_SENT_SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }

    async checkOTP(req, res, next) {
        try {
            const { mobile, code } = req.body;
            const { user, accessToken, refreshToken } = await this.#service.checkOTP(mobile, code);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({
                message: AuthMessage.OTP_VERIFIED_SUCCESS,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const token = req.cookies.refreshToken;
            if (!token) throw createHttpError.Unauthorized(AuthMessage.REFRESH_TOKEN_NOT_FOUND);

            const { accessToken, refreshToken } = await this.#service.verifyRefreshToken(token);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({
                message: AuthMessage.REFRESH_TOKEN_SUCCESS,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    }

    async getMe(req, res, next) {
        try {
            const token = req.cookies.accessToken;
            if (!token) throw createHttpError.Unauthorized("Access token not found");

            const { ACCESS_TOKEN_SECRET } = process.env;
            const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);

            if (!payload?.userId) throw createHttpError.Unauthorized("Invalid token");

            const user = await this.#service.getMe(payload.userId);

            return res.json({ user });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            return res.json({
                message: AuthMessage.LOGOUT_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();