import autoBind from "auto-bind"
import { User } from "./user.model.js";
import { USER_ROLES } from "../../constant/roles.constant.js";
import { Op } from "sequelize";
import createHttpError from "http-errors";
import { UserMessage } from "../../constant/messages.constant.js";

class UserService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = User
    }

    async updateUserName(userId, full_name) {
        const user = await this.#model.findByPk(userId);
        if (!user) return null;

        await user.update({ full_name });
        return user;
    }

    async getAllUsers() {
        return await this.#model.findAll({
            attributes: ["id", "mobile", "full_name", "avatar", "role", "is_banned", "created_at"],
            order: [["id", "DESC"]]
        })
    }

    async getUserById(id) {
        return await this.#model.findOne({
            where: { id },
            attributes: ["id", "mobile", "full_name", "avatar", "role", "is_banned", "created_at"],
        })
    }

    async updateUser(id, data) {
        const user = await this.#model.findByPk(id)
        if (!user) return null

        if (data.mobile) {
            const exists = await this.#model.findOne({
                where: {
                    mobile: data.mobile,
                    id: { [Op.ne]: id }
                }
            });

            if (exists) {
                throw createHttpError.Conflict(UserMessage.USER_MOBILE_EXISTS);
            }
        }

        const allowedFields = ["mobile", "full_name", "avatar"];
        const fieldsToUpdate = {};

        for (const field of allowedFields) {
            if (data[field] !== undefined) {
                fieldsToUpdate[field] = data[field]
            }
        }

        await user.update(fieldsToUpdate)
        return user
    }

    async changeUserRole(id, role) {
        if (!Object.values(USER_ROLES).includes(role)) {
            throw new Error('Invalid role')
        }

        const user = await this.#model.findByPk(id)
        if (!user) return null

        await user.update({ role })
        return user
    }

    async deleteUser(id) {
        const user = await this.#model.findByPk(id)
        if (!user) return null

        await user.destroy()
        return user
    }

    async banUser(id) {
        const user = await this.#model.findByPk(id)

        if (!user) return null

        await user.update({ is_banned: true })
        return user
    }

    async unBanUser(id) {
        const user = await this.#model.findByPk(id)
        if (!user) return null

        await user.update({ is_banned: false })
        return user
    }
}

export default new UserService()