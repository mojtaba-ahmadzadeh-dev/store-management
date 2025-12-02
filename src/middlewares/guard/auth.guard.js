import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { User } from "../../modules/user/user.model.js";
import { AuthMessage } from "../../constant/messages.constant.js";

export const authGuard = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;            

        if (!accessToken) throw createHttpError.Unauthorized(AuthMessage.ACCESS_TOKEN_INVALID);

        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        
        if (!payload?.userId) throw createHttpError.Unauthorized(AuthMessage.ACCESS_TOKEN_INVALID);

        const user = await User.findOne({
            where: { id: payload.userId },
        });

        if (!user) throw createHttpError.NotFound(AuthMessage.USER_NOT_FOUND);

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            next(createHttpError.Unauthorized(AuthMessage.ACCESS_TOKEN_INVALID));
        } else {
            next(createHttpError.Unauthorized(AuthMessage.ACCESS_TOKEN_INVALID));
        }
    }
};
