import autoBind from "auto-bind"
import { Permission, Role } from "./rbac.model.js";

class RBACService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = Role
    }

    async createPermission(data) {
        const { name, description } = data;

        const exists = await Permission.findOne({ where: { name } });
        if (exists) {
            throw new Error(`Permission با نام "${name}" قبلاً موجود است`);
        }

        const permission = await Permission.create({ name, description });
        return permission;
    }

    async getAllPermissions() {
        return Permission.findAll()
    }
}

export default new RBACService()