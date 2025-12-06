import autoBind from "auto-bind"
import rbacService from "./rbac.service.js";
import { RBACMessage } from "../../constant/messages.constant.js";

class RBACController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = rbacService
    }

    async createRole(req, res, next) {
        try {
            const { title, description } = req.body;
            const role = await this.#service.createRole({ title, description })
            return res.status(201).json({
                success: true,
                message: RBACMessage.ROLE_CREATED_SUCCESS,
                data: role
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new RBACController()