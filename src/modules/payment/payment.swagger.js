/**
 * @swagger
 * tags:
 *   name: Payment 💳
 *   description: APIs for creating and processing payments
 */

/* -------------------------------------------------------------
   📌 Create Payment for Basket (POST /payment/basket)
-------------------------------------------------------------- */
/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a payment for the user's basket
 *     tags: [Payment 💳]
 *     security:
 *       - bearerAuth: []   # اگر از JWT استفاده می‌کنید
 *     responses:
 *       200:
 *         description: Payment created successfully, payment URL returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "پرداخت ایجاد شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       description: Order details
 *                       properties:
 *                         id:
 *                           type: integer
 *                         userId:
 *                           type: integer
 *                         total_price:
 *                           type: number
 *                         final_amount:
 *                           type: number
 *                         status:
 *                           type: string
 *                         shipping_address:
 *                           type: string
 *                     orderItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: integer
 *                           quantity:
 *                             type: integer
 *                           price:
 *                             type: number
 *                           total_price:
 *                             type: number
 *                     payment:
 *                       type: string
 *                       description: Payment URL (e.g., Zarinpal)
 *                       example: "https://zarinpal.com/payment/123"
 *
 *       401:
 *         description: Access token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "توکن معتبر نیست"
 *
 *       500:
 *         description: Internal server error
 */

/* -------------------------------------------------------------
   📌 Verify Zarinpal Payment (GET /payment/callback)
-------------------------------------------------------------- */
/**
 * @swagger
 * /payment/verify:
 *   get:
 *     summary: Verify Zarinpal payment after callback
 *     description: |
 *       This endpoint is called by Zarinpal after payment.
 *       It verifies the payment using Authority and Status query params.
 *     tags: [Payment 💳]
 *     parameters:
 *       - in: query
 *         name: Authority
 *         required: true
 *         schema:
 *           type: string
 *         description: Authority code returned by Zarinpal
 *         example: "S000000000000000000000000000000vo1nv"
 *
 *       - in: query
 *         name: Status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [OK, NOK]
 *         description: Payment status returned by Zarinpal
 *         example: "OK"
 *
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "پرداخت با موفقیت تایید شد"
 *
 *       400:
 *         description: Payment canceled or verification failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "پرداخت توسط کاربر لغو شد"
 *
 *       409:
 *         description: Payment already verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "already verified payment"
 *
 *       500:
 *         description: Internal server error
 */