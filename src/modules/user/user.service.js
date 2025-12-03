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
}

export default new UserService()