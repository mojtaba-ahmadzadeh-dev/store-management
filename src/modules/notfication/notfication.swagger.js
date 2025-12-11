/**
 * @swagger
 * tags:
 *   name: Notfication 🔔
 *   description: APIs for managing system and user notifications
 */

/* -------------------------------------------------------------
   📌 Create Notification (POST /notification)
-------------------------------------------------------------- */
/**
 * @swagger
 * /notfication:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notfication 🔔]
 *     description: |
 *       Create a notification sent by the system or admin. 
 *       The `type` field specifies the type of notification, 
 *       and `related_id` links to the corresponding item (order, comment, product, etc.).
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Order"
 *                 description: Notification title
 *               message:
 *                 type: string
 *                 example: "Order #254 has been placed"
 *               user_id:
 *                 type: integer
 *                 example: 12
 *                 description: The user who will receive the notification
 *               related_id:
 *                 type: integer
 *                 example: 254
 *                 description: The ID of the related item (order, comment, product, etc.)
 *               type:
 *                 type: string
 *                 enum: [info, order, comment, product, discount]
 *                 example: "order"
 *                 description: Type of notification
 *
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                     message:
 *                       type: string
 *                     user_id:
 *                       type: integer
 *                     related_id:
 *                       type: integer
 *                     type:
 *                       type: string
 *                     read:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *
 *       400:
 *         description: Required fields are missing
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "title and message are required"
 */

/* -------------------------------------------------------------
   📌 Get User Notifications (GET /notification/user/{userId})
-------------------------------------------------------------- */
/**
 * @swagger
 * /notfication/user/{id}:
 *   get:
 *     summary: Get all notifications of a specific user
 *     tags: [Notfication 🔔]
 *     description: Fetch notifications for a user. Each notification may relate to an order, comment, product, or discount.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *
 *     responses:
 *       200:
 *         description: Successfully fetched user notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notifications fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "New Order"
 *                       message:
 *                         type: string
 *                         example: "Order #254 has been placed"
 *                       user_id:
 *                         type: integer
 *                         example: 12
 *                       related_id:
 *                         type: integer
 *                         example: 254
 *                       type:
 *                         type: string
 *                         enum: [info, order, comment, product, discount]
 *                         example: "order"
 *                       createdAt:
 *                         type: string
 *                         example: "2025-01-01T12:00:00.000Z"
 *
 *       400:
 *         description: userId is required
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID is required"
 *
 *       404:
 *         description: No notifications found for this user
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notifications not found"
 */