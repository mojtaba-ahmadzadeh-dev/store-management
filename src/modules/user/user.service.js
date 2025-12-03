import autoBind from "auto-bind"
import { User } from "./user.model.js";

class UserService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = User
    }

    async getAllUsers() {
        return await this.#model.findAll({
            attributes: ["id", "mobile", "full_name", "avatar", "role", "created_at"],
            order: [["id", "DESC"]]
        })
    }

    async getUserById(id) {
        return await this.#model.findOne({
            where: { id },
            attributes: ["id", "mobile", "full_name", "avatar", "role", "created_at"],
        })
    }
}

export default new UserService()