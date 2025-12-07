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
    
    async updatePermission(id, data) {
        const permission = await Permission.findByPk(id);
        if (!permission) {
            throw new Error("Permission پیدا نشد");
        }
        const { name, description } = data;

        if (name && name !== permission.name) {
            const exists = await Permission.findOne({ where: { name } });
            if (exists) {
                throw new Error(`Permission با نام "${name}" قبلاً موجود است`);
            }
        }

        permission.name = name ?? permission.name;
        permission.description = description ?? permission.description;

        await permission.save();
        return permission;
    }
}

export default new RBACService()