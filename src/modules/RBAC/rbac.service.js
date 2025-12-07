import autoBind from "auto-bind"
import { Permission, Role } from "./rbac.model.js";
import createHttpError from "http-errors";
import { RBACMessage } from "../../constant/messages.constant.js";

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

    async deletePermission(id) {
        const permission = await Permission.findByPk(id)
        if (!permission) throw createHttpError(404, RBACMessage.PERMISSION_NOT_FOUND);
        await permission.destroy();
        return permission;
    }

    async createRole(data) {
        const { title, description, permissionIds = [] } = data;
        const exists = await Role.findOne({ where: { title } });
        if (exists) throw createHttpError(400, RBACMessage.ROLE_ALREADY_EXISTS);

        const role = await Role.create({ title, description });

        if (permissionIds.length > 0) {
            const permissions = await Permission.findAll({ where: { id: permissionIds } });
            await role.setPermissions(permissions);
        }

        return await Role.findByPk(role.id, { include: ["permissions"] });
    }

    async getAllRoles() {
        return Role.findAll({
            include: [
                {
                    model: Permission,
                    as: "permissions",
                    through: { attributes: [] }
                }
            ],
            order: [["id", "ASC"]]
        })
    }
}

export default new RBACService()