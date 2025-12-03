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

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updateUser = await this.#service.updateUser(id, data)
            return res.json({
                message: UserMessage.USER_UPDATE_SUCCESS,
                user: updateUser
            })
        } catch (error) {
            next(error)
        }
    }

    async changeUserRole(req, res, next) {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const updatedUser = await this.#service.changeUserRole(id, role);
            if (!updatedUser) throw createHttpError(404, UserMessage.USER_NOT_FOUND);

            return res.json({
                message: UserMessage.USER_UPDATE_ROLE_SUCCESS,
                user: updatedUser,
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        const { id } = req.params;

        const deletedUser = await this.#service.deleteUser(id)
        if (!deletedUser) throw createHttpError(404, UserMessage.USER_NOT_FOUND);

        return res.json({
            message: UserMessage.USER_DELETE_SUCCESS,
            user: deletedUser
        });
    }
}

export default new UserController()