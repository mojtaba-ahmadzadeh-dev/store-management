import autoBind from "auto-bind"
import rbacService from "./rbac.service.js";
import { RBACMessage } from "../../constant/messages.constant.js";
import createHttpError from "http-errors";

class RBACController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = rbacService
    }

    async createPermission(req, res, next) {
        try {
            const { name, description } = req.body;

            if (!name) {
                throw createHttpError(400, "title is required");
            }

            const permission = await this.#service.createPermission({ name, description });

            res.status(201).json({
                message: RBACMessage.PERMISSION_ASSIGN_SUCCESS,
                success: true,
                data: permission
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllPermissions(req, res, next) {
        try {
            const permissions = await this.#service.getAllPermissions();
            res.status(200).json({
                message: RBACMessage.PERMISSIONS_FETCHED_SUCCESS,
                success: true,
                data: permissions
            });
        } catch (error) {
            next(error)
        }
    }

    async updatePermission(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const permission = await this.#service.updatePermission(id, { name, description })
            res.status(200).json({
                message: RBACMessage.PERMISSION_UPDATED_SUCCESS,
                success: true,
                data: permission
            });
        } catch (error) {
            next(error)
        }
    }

    async deletePermission(req, res, next) {
        try {
            const { id } = req.params;
            const permission = await this.#service.deletePermission(id);
            res.status(200).json({
                message: RBACMessage.PERMISSION_DELETED_SUCCESS,
                success: true,
                data: permission
            });
        } catch (error) {
            next(error)
        }
    }

    async createRole(req, res, next) {
        try {
            const { title, description } = req.body;

            const role = await this.#service.createRole({ title, description });
            res.status(201).json({
                message: "Role created successfully",
                success: true,
                data: role
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllRoles(req, res, next) {
        try {
            const roles = await this.#service.getAllRoles();
            res.status(200).json({
                message: RBACMessage.ROLES_FETCHED_SUCCESS,
                success: true,
                data: roles
            });
        } catch (error) {
            next(error)
        }
    }

    async updateRole(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, permissionIds } = req.body;
            const role = await this.#service.updateRole(id, { title, description, permissionIds })
            res.status(200).json({
                message: RBACMessage.ROLE_UPDATED_SUCCESS,
                success: true,
                data: role
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteRole(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRole = await this.#service.deleteRole(id);

            res.status(200).json({
                message: RBACMessage.ROLE_DELETED_SUCCESS,
                success: true,
                data: deletedRole
            });
        } catch (error) {
            next(error)
        }
    }

    async assignPermissionToRole(req, res, next) {
        try {
            const { roleId, permissions } = req.body;
            const updatedRole = await this.#service.assignPermissionToRole(roleId, permissions)
            res.status(200).json({
                message: RBACMessage.PERMISSION_ASSIGN_SUCCESS,
                success: true,
                data: updatedRole
            });
        } catch (error) {
            next(error)
        }
    }

    async assignRoleToUser(req, res, next) {
        try {
            const { userId, roleIds } = req.body;
            if (!userId || !roleIds || !Array.isArray(roleIds)) {
                throw createHttpError(400, "userId and roleIds are required");
            }

            const updatedUser = await this.#service.assignRoleToUser(userId, roleIds);

            res.status(200).json({
                message: RBACMessage.USER_ROLE_ASSIGNED_SUCCESS,
                success: true,
                data: updatedUser
            });
        } catch (error) {
            next(error);
        }
    }

}

export default new RBACController()