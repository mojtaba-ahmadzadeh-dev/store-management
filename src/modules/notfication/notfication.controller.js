import createHttpError from "http-errors";
import { NotficationMessage } from "../../constant/messages.constant.js";
import notficationService from "./notfication.service.js";

class NotficationService {
    #service
    constructor() {
        this.#service = notficationService;
    }

    async createNotfication(req, res, next) {
        try {
            const { title, message, user_id, product_id, type, related_id } = req.body;

            if (!title || !message) throw createHttpError(NotficationMessage.REQUIRED_FIELDS)

            const notification = await notficationService.createNotfication({
                title,
                message,
                user_id,
                product_id,
                type,
                related_id
            });

            return res.status(201).json({
                message: NotficationMessage.CREATE_NOTFICATION_SUCCESS,
                data: notification
            });

        } catch (error) {
            next(error)
        }
    }

    async getUserNotifications(req, res, next) {
        try {
            const { id } = req.params;
            const notifications = await notficationService.getUserNotifications(id);
            return res.status(200).json({
                message: NotficationMessage.FETCH_ALL_SUCCESS,
                data: notifications
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new NotficationService()