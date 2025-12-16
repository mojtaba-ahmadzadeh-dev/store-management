import autoBind from "auto-bind"
import createHttpError from "http-errors";
import { RBACMessage } from "../../constant/messages.constant.js";
import { Role, Permission, RolePermission } from "./rbac.model.js";
import { Op } from "sequelize";
import { User } from "../user/user.model.js";
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
        const { title, description } = data;
        const exists = await Role.findOne({ where: { title } });
        if (exists) throw createHttpError(409, RBACMessage.ROLE_ALREADY_EXISTS);

        const role = await Role.create({
            title,
            description
        })
        return role
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

    async assignPermissionToRole(roleId, permissions = []) {
        const role = await Role.findByPk(roleId);
        if (!role) throw createHttpError(404, RBACMessage.ROLE_NOT_FOUND);

        if (permissions.length > 0) {
            // پیدا کردن permission هایی که واقعا وجود دارند
            const permissionList = await Permission.findAll({
                where: { id: { [Op.in]: permissions } }
            });

            if (permissionList.length !== permissions.length) {
                throw createHttpError(400, RBACMessage.PERMISSION_SOME_NOT_FOUND);
            }

            // ⚡️ استفاده از متد instance Sequelize
            await role.setPermissions(permissionList);
        }

        return await Role.findByPk(roleId, { include: ["permissions"] });
    }


    async assignRoleToUser(userId, roleIds = []) {
        const user = await User.findByPk(userId);
        if (!user) throw createHttpError(404, "User not found");

        if (roleIds.length > 0) {
            const roles = await Role.findAll({ where: { id: { [Op.in]: roleIds } } });
            if (roles.length !== roleIds.length) {
                throw createHttpError(400, "Some roles not found");
            }
            await user.setRoles(roles); // متد belongsToMany Sequelize
        }

        return await User.findByPk(userId, { include: [{ model: Role, as: "roles" }] });
    }


}

export default new RBACService()