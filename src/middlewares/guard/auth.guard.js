// middlewares/guard/auth.guard.js
import createHttpError from "http-errors";
import { User } from "../../modules/user/user.model.js";
import jwt from "jsonwebtoken";
import { RBACMessage } from "../../constant/messages.constant.js";

export const authGuard = () => {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.accessToken;
      if (!token) throw createHttpError.Unauthorized(RBACMessage.ACCESS_TOKEN_NOT_FOUND);

      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!payload?.userId) throw createHttpError.Unauthorized("Invalid token");

      const user = await User.findByPk(payload.userId);
      if (!user) throw createHttpError.NotFound(RBACMessage.USER_NOT_FOUND);

      req.user = user;

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return next(createHttpError.Unauthorized("Token expired"));
      }
      if (err.name === "JsonWebTokenError") {
        return next(createHttpError.Unauthorized("Invalid token"));
      }
      next(err);
    }
  };
};