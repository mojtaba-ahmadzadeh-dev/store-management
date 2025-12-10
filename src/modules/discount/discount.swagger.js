/**
 * @swagger
 * tags:
 *   name: Discount 🎟️
 *   description: Discount code management APIs
 */

/* -------------------------------------------------------------
   📌 Create Discount (POST /discount)
-------------------------------------------------------------- */
/**
 * @swagger
 * /discount:
 *   post:
 *     summary: Create a new discount code
 *     tags: [Discount 🎟️]
 *     security:
 *       - bearerAuth: []
 *     description: ایجاد یک کد تخفیف جدید (فقط مدیر می‌تواند ایجاد کند)
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - percentage
 *             properties:
 *               code:
 *                 type: string
 *                 example: "OFF20"
 *                 description: Discount code
 *
 *               percentage:
 *                 type: integer
 *                 example: 20
 *                 description: Discount percentage
 *
 *               max_usage:
 *                 type: integer
 *                 example: 10
 *                 description: Maximum allowed usage count
 *
 *               expire_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-30T00:00:00Z"
 *                 description: Expiration date of discount code
 *
 *               product_id:
 *                 type: integer
 *                 example: 5
 *                 description: ID of product this discount is limited to
 *
 *               user_id:
 *                 type: integer
 *                 example: 12
 *                 description: ID of user this discount is limited to
 *
 *     responses:
 *       201:
 *         description: Discount code created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تخفیف با موفقیت ایجاد شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     code:
 *                       type: string
 *                       example: "OFF20"
 *                     percentage:
 *                       type: integer
 *                       example: 20
 *                     max_usage:
 *                       type: integer
 *                       example: 10
 *                     expire_at:
 *                       type: string
 *                       example: "2025-06-30T00:00:00Z"
 *                     status:
 *                       type: string
 *                       example: "active"
 *
 *       400:
 *         description: Invalid input or duplicate discount code
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تخفیف تکراری است"
 *
 *       401:
 *         description: Unauthorized — token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "توکن معتبر نیست"
 */

/**
 * @swagger
 * /discount:
 *   get:
 *     summary: Get the list of all discounts
 *     tags: [Discount 🎟️]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched the list of discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully fetched the list of discounts."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       code:
 *                         type: string
 *                         example: "OFF20"
 *                       percentage:
 *                         type: integer
 *                         example: 20
 *                       max_usage:
 *                         type: integer
 *                         example: 10
 *                       used_count:
 *                         type: integer
 *                         example: 0
 *                       expire_at:
 *                         type: string
 *                         example: "2025-06-30T00:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "active"
 */

/**
 * @swagger
 * /discount/{idOrCode}:
 *   get:
 *     summary: Get a single discount by ID or code
 *     tags: [Discount 🎟️]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idOrCode
 *         required: true
 *         schema:
 *           type: string
 *         description: ID or code of the discount
 *     responses:
 *       200:
 *         description: Discount fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Discount fetched successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     code:
 *                       type: string
 *                       example: "OFF20"
 *                     percentage:
 *                       type: integer
 *                       example: 20
 *                     max_usage:
 *                       type: integer
 *                       example: 10
 *                     used_count:
 *                       type: integer
 *                       example: 0
 *                     expire_at:
 *                       type: string
 *                       example: "2025-06-30T00:00:00Z"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       400:
 *         description: ID or code is required
 *       404:
 *         description: Discount not found
 */