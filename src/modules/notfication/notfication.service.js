import { Notification } from "./notfication.model.js";

class NotficationController {

    constructor() {
    }

    async createNotfication(data) {
        return await Notification.create({
            title: data.title,
            message: data.message,
            user_id: data.user_id || null,
            product_id: data.product_id || null,
            type: data.type || "info",
            read: false
        });
    }

    async getUserNotifications(id) {
        const notifications = await Notification.findAll({
            where: { user_id: id },
            order: [["createdAt", "DESC"]]
        });

        return notifications;
    }

}

export default new NotficationController()