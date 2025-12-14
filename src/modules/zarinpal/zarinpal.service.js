import axios from "axios";
import { config } from "dotenv";
import createHttpError from "http-errors";

config()

class ZarinpalService {
    constructor() { }

    async zarinpalRequest(amount, user, description = 'سبد خرید') {
        try {
            const amountInt = Math.round(amount);
            const response = await axios.post(process.env.ZARINPAL_REQUEST_URL, {
                merchant_id: process.env.ZARINPAL_MERCHANT_ID,
                callback_url: process.env.ZARINPAL_CALLBACK_URL,
                amount: amountInt,
                description,
                metadata: {
                    email: "example@gmail.com",
                    mobile: String(user?.mobile || '')
                }
            });

            if (response?.data?.data?.authority) {
                return {
                    payment_url: `${process.env.ZARINPAL_GATEWAY_URL}/${response.data.data.authority}`,
                    authority: response.data.data.authority,
                    status: response.data.data.code
                };
            } 

            if (!response?.data?.data?.authority) {
                throw createHttpError(400, 'zarinpal service not available');
            }

            return {
                status: response.data.data?.code || response.data.code,
                authority: response.data.data?.authority,
                payment_url: response.data.data?.payment_url
            };

        } catch (error) {
            console.error("Zarinpal Request Error:", error.response?.data || error.message);
            throw error;
        }
    }
}

export default new ZarinpalService();