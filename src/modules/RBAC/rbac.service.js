import autoBind from "auto-bind"
import { Role } from "./rbac.model.js";

class RBACService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = Role
    }

    async createRole(data) {
        try {
            const role = await this.#model.create({
                title: data.title,
                description: data.description || ""
            });
            return role;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new RBACService()