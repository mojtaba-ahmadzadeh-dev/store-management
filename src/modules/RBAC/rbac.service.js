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
        if (exists) throw createHttpError(409, RBACMessage.PERMISSION_ALREADY_EXISTS)
        const permission = await Permission.create({ name, description });
        return permission;
    }

    async getAllPermissions() {
        return Permission.findAll()
    }

    async updatePermission(id, data) {
        const permission = await Permission.findByPk(id);
        if (!permission) throw createHttpError(404, RBACMessage.PERMISSION_NOT_FOUND)
        const { name, description } = data;

        if (name && name !== permission.name) {
            const exists = await Permission.findOne({ where: { name } });
            if (exists) {
                throw createHttpError(409, RBACMessage.PERMISSION_ALREADY_EXISTS)
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

    async updateRole(id, data) {
        const { title, description, permissionIds = [] } = data;
        const role = await Role.findByPk(id)
        if (!role) throw createHttpError(404, RBACMessage.ROLE_NOT_FOUND);

        if (title && title !== role.title) {
            const exists = await Role.findOne({ where: { title } });
            if (exists) throw createHttpError(400, RBACMessage.ROLE_ALREADY_EXISTS);
            role.title = title;
        }

        role.description = description ?? role.description;
        await role.save();

        if (permissionIds.length > 0) {
            const permissions = await Permission.findAll({ where: { id: permissionIds } });
            await role.setPermissions(permissions);
        }
        return await Role.findByPk(role.id, { include: ["permissions"] });
    }

    async deleteRole(id) {
        const role = await Role.findByPk(id, { include: ["permissions"] });
        if (!role) throw createHttpError(404, RBACMessage.ROLE_NOT_FOUND);
        await role.setPermissions([]);
        await role.destroy()
        return role
    }

    async assignPermissionToRole(roleId, permissionIds = []) {
        const role = await Role.findByPk(roleId, { include: ["permissions"] });
        if (!role) throw createHttpError(404, RBACMessage.ROLE_NOT_FOUND);
        const permissions = await Permission.findAll({ where: { id: permissionIds } });
        if (permissions.length !== permissionIds.length) {
            throw createHttpError(404, RBACMessage.PERMISSION_NOT_FOUND);
        }
        await role.addPermissions(permissions);
        return await Role.findByPk(roleId, { include: ["permissions"] });
    }
}

export default new RBACService()