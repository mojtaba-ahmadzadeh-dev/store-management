import autoBind from "auto-bind"
import rbacService from "./rbac.service.js";
import { RBACMessage } from "../../constant/messages.constant.js";

class RBACController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = rbacService
    }
    async createPermission(req, res, next) {
        try {
            const { name, description } = req.body
            const permission = await this.#service.createPermission({ name, description })
            res.status(201).json({
                message: RBACMessage.ROLE_CREATED_SUCCESS,
                success: true,
                data: permission
            });
        } catch (error) {
            next(error)
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
}

export default new RBACController()