import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { AuthMessage } from '../../constant/messages.constant.js';

export const authGuard = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : req.cookies?.accessToken;

        if (!token) {
            throw createHttpError.Unauthorized(AuthMessage.REFRESH_TOKEN_NOT_FOUND);
        }

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!payload?.userId) {
            throw createHttpError.Unauthorized(AuthMessage.REFRESH_TOKEN_INVALID);
        }

        req.user = { id: payload.userId };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            next(createHttpError.Unauthorized(AuthMessage.REFRESH_TOKEN_EXPIRED));
        } else {
            next(createHttpError.Unauthorized(AuthMessage.REFRESH_TOKEN_INVALID));
        }
    }
};