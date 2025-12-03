import autoBind from "auto-bind"
import { UserMessage } from "../../constant/messages.constant.js";
import createHttpError from "http-errors";
import userService from './user.service.js'

class UserController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = userService
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await this.#service.getAllUsers()
            return res.json({
                message: UserMessage.USERS_LIST_SUCCESS,
                users
            })
        } catch (error) {
            next(error)
        }
    }

    async getUserById(req, res, next) {
        const { id } = req.params;

        const user = await this.#service.getUserById(id)

        if (!user) throw createHttpError(404, UserMessage.USER_NOT_FOUND)

        return res.json({
            message: UserMessage.USER_SUCCESS,
            user
        })
    }
}

export default new UserController()