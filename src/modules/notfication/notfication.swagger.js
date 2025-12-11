/**
 * @swagger
 * tags:
 *   name: Notification 🔔
 *   description: APIs for managing system and user notifications
 */

/* -------------------------------------------------------------
   📌 Create Notification (POST /notfication)
-------------------------------------------------------------- */
/**
 * @swagger
 * /notfication:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notification 🔔]
 *     description: |
 *       This API is used to create a new notification sent by the admin or the system.
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
 *                 example: "Special Discount"
 *                 description: Notification title
 *               message:
 *                 type: string
 *                 example: "Get 30% off on all Call of Duty items!"
 *               user_id:
 *                 type: integer
 *                 example: 3
 *                 description: Send notification to a specific user (optional)
 *               product_id:
 *                 type: integer
 *                 example: 12
 *                 description: Link notification to a specific product (optional)
 *               type:
 *                 type: string
 *                 example: "discount"
 *                 description: Notification type (info, warning, discount, order, etc.)
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
 *                     product_id:
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
 *
 *       500:
 *         description: Internal server error
 */

/* -------------------------------------------------------------
   📌 Get User Notifications (GET /notfication/user/{userId})
-------------------------------------------------------------- */
/**
 * @swagger
 * /notfication/user/{id}:
 *   get:
 *     summary: Get all notifications of a specific user
 *     tags: [Notification 🔔]
 *     description: Fetch a list of notifications related to the given user ID.
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
 *                       product_id:
 *                         type: integer
 *                         example: 5
 *                       type:
 *                         type: string
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