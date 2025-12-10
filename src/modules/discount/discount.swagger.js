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
 * /discount/{id}:
 *   get:
 *     summary: Get a single discount by ID or code
 *     tags: [Discount 🎟️]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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

/**
 * @swagger
 * /discount/{id}:
 *   patch:
 *     summary: Update a discount by ID
 *     tags: [Discount 🎟️]
 *     security:
 *       - bearerAuth: []
 *     description: Update the details of an existing discount code (admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the discount to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "OFF25"
 *                 description: Updated discount code
 *               percentage:
 *                 type: integer
 *                 example: 25
 *                 description: Updated discount percentage
 *               max_usage:
 *                 type: integer
 *                 example: 20
 *                 description: Updated maximum usage
 *               expire_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-31T00:00:00Z"
 *                 description: Updated expiration date
 *               product_id:
 *                 type: integer
 *                 example: 5
 *                 description: Updated product ID
 *               user_id:
 *                 type: integer
 *                 example: 12
 *                 description: Updated user ID
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "تخفیف با موفقیت ویرایش شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     code:
 *                       type: string
 *                       example: "OFF25"
 *                     percentage:
 *                       type: integer
 *                       example: 25
 *                     max_usage:
 *                       type: integer
 *                       example: 20
 *                     used_count:
 *                       type: integer
 *                       example: 0
 *                     expire_at:
 *                       type: string
 *                       example: "2025-07-31T00:00:00Z"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       400:
 *         description: Invalid input or duplicate discount code
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تخفیف تکراری است"
 *       401:
 *         description: Unauthorized — token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "توکن معتبر نیست"
 *       404:
 *         description: Discount not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "تخفیف مورد نظر یافت نشد"
 */

/**
 * @swagger
 * /discount:
 *   delete:
 *     summary: Delete all discount codes (admin only)
 *     tags: [Discount 🎟️]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All discounts deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "تمام کدهای تخفیف حذف شدند"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedCount:
 *                       type: integer
 *                       example: 5
 */

/**
 * @swagger
 * /discount/{id}:
 *   delete:
 *     summary: Delete a single discount by ID
 *     tags: [Discount 🎟️]
 *     security:
 *       - bearerAuth: []
 *     description: حذف یک کد تخفیف خاص (فقط مدیر می‌تواند)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the discount to delete
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تخفیف با موفقیت حذف شد"
 *       400:
 *         description: ID is required
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "لطفاً id یا code را وارد کنید."
 *       404:
 *         description: Discount not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "تخفیف مورد نظر یافت نشد"
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
