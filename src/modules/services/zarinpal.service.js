import axios from "axios";
import { config } from "dotenv";
import createHttpError from "http-errors";

config()

class ZarinpalService {
    constructor() { }

    async zarinpalRequest(amount, user, description = 'سبد خرید') {
        try {
            const amountInRial = Math.round(amount * 10);
            const response = await axios.post(process.env.ZARINPAL_REQUEST_URL, {
                merchant_id: process.env.ZARINPAL_MERCHANT_ID,
                callback_url: process.env.ZARINPAL_CALLBACK_URL,
                amount: amountInRial,
                description,
                metadata: {
                    email: "example@gmail.com",
                    mobile: String(user?.mobile || '')
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
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

    async zarinpalVerify(amount, authority) {
        const amountInRial = Math.round(amount * 10)
        const response = await axios.post(process.env.ZARINPAL_VERIFY_URL, {
            merchant_id: process.env.ZARINPAL_MERCHANT_ID,
            authority,
            amount: amountInRial
        });

        const data = response?.data?.data;

        if (!data) throw createHttpError(500, 'خطا در دریافت پاسخ زرین‌پال');

        const { code, ref_id, card_pan, fee, fee_type } = data;

        if (code === 100 || code === 101) {
            return { code, ref_id, card_pan, fee, fee_type };
        }

        throw createHttpError(400, `تراکنش ناموفق، کد: ${code}`);
    }

}

export default new ZarinpalService();