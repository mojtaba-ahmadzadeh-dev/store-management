import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { User } from "../../modules/user/user.model.js";
import { AuthMessage } from "../../constant/messages.constant.js";

export const authGuard = async (req, res, next) => {

    try {
        let token = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : null;

        if (!token && req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            throw createHttpError.Unauthorized(AuthMessage.ACCESS_TOKEN_INVALID);
        }

        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findByPk(verified.userId);
        if (!user) {
            throw createHttpError.Unauthorized(AuthMessage.ACCESS_TOKEN_INVALID);
        }

        req.user = {
            id: user.id,
            mobile: user.mobile,
            full_name: user.full_name,
            role: user.role,
        };

        next();

    } catch (error) {
        console.error(error);
        return next(createHttpError.Unauthorized(AuthMessage.ACCESS_TOKEN_INVALID));
    }
};