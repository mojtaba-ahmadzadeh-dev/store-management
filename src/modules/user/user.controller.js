import autoBind from "auto-bind"
import userService from "./user.service.js";
import { UserMessage } from "../../constant/messages.constant.js";

class UserController {
    #service;
    constructor() {
        autoBind(this)
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json({
                message: UserMessage.USERS_LIST_SUCCESS,
                users
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()