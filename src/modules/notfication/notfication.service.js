import { Notfication } from "./notfication.model.js";

class NotficationController {

    constructor() {
    }

    async createNotfication(data) {
        return await Notfication.create({
            title: data.title,
            message: data.message,
            user_id: data.user_id || null,
            related_id: data.related_id || null,
            type: data.type || "info",
            read: false
        });
    }

    async getUserNotifications(id) {
        const notifications = await Notfication.findAll({
            where: { user_id: id },
            order: [["createdAt", "DESC"]]
        });

        return notifications;
    }

}

export default new NotficationController()