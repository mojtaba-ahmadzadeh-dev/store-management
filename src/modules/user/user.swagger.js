/**
 * @swagger
 * tags:
 *   name: User 👤
 *   description: APIs for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User 👤]
 *     summary: Get all users
 *     description: This endpoint retrieves a list of all registered users.
 *     responses:
 *       200:
 *         description: Users list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users list retrieved successfully"
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       mobile:
 *                         type: string
 *                         example: "09123456789"
 *                       full_name:
 *                         type: string
 *                         nullable: true
 *                         example: "Mohammad Javad"
 *                       avatar:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/avatar.png"
 *                       role:
 *                         type: string
 *                         example: "user"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-03T07:14:16.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User 👤]
 *     summary: Get user by ID
 *     description: This endpoint retrieves a single user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User retrieved successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     mobile:
 *                       type: string
 *                       example: "09123456789"
 *                     full_name:
 *                       type: string
 *                       nullable: true
 *                       example: "Mohammad Javad"
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar.png"
 *                     role:
 *                       type: string
 *                       example: "string"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-03T07:14:16.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User with id 1 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags: [User 👤]
 *     summary: Update a user by ID
 *     description: This endpoint updates user information for a given ID. The role cannot be updated here.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "09123456789"
 *               full_name:
 *                 type: string
 *                 example: "Mohammad Javad"
 *               avatar:
 *                 type: string
 *                 example: "https://example.com/avatar.png"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     mobile:
 *                       type: string
 *                       example: "09123456789"
 *                     full_name:
 *                       type: string
 *                       nullable: true
 *                       example: "Mohammad Javad"
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar.png"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-03T07:14:16.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User with id 1 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /users/role/{id}:
 *   put:
 *     tags: [User 👤]
 *     summary: Change user role (Admin only)
 *     description: This endpoint allows an admin to change the role of a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose role will be changed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: "admin"
 *                 description: New role for the user. Must be a valid role like "user", "admin", etc.
 *     responses:
 *       200:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User role updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     mobile:
 *                       type: string
 *                       example: "09123456789"
 *                     full_name:
 *                       type: string
 *                       nullable: true
 *                       example: "Mohammad Javad"
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar.png"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-03T07:14:16.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User with id 1 not found"
 *       400:
 *         description: Invalid role provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid role"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     tags: [User 👤]
 *     summary: Delete a user by ID (Admin only)
 *     description: This endpoint allows an admin to delete a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     mobile:
 *                       type: string
 *                       example: "09123456789"
 *                     full_name:
 *                       type: string
 *                       nullable: true
 *                       example: "Mohammad Javad"
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar.png"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-03T07:14:16.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User with id 1 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /users/me/name:
 *   patch:
 *     tags: [User 👤]
 *     summary: Update logged-in user's name
 *     description: This endpoint updates only the `full_name` of the logged-in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Mohammad Javad"
 *     responses:
 *       200:
 *         description: Name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "نام با موفقیت تغییر کرد"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     full_name:
 *                       type: string
 *                       example: "Mohammad Javad"
 *                     mobile:
 *                       type: string
 *                       example: "09123456789"
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar.png"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-03T07:14:16.000Z"
 *       400:
 *         description: full_name not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "نام جدید ارسال نشده است"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کاربر پیدا نشد"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /users/ban/{id}:
 *   put:
 *     tags: [User 👤]
 *     summary: Ban a user by ID (Admin only)
 *     description: This endpoint allows an admin to ban a user by setting `is_banned` to true.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to ban
 *     responses:
 *       200:
 *         description: User banned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کاربر با موفقیت مسدود شد"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     mobile:
 *                       type: string
 *                       example: "09123456789"
 *                     full_name:
 *                       type: string
 *                       example: "Mohammad Javad"
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar.png"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     is_banned:
 *                       type: boolean
 *                       example: true
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-03T07:14:16.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User with id 1 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /users/unban/{id}:
 *   put:
 *     tags: [User 👤]
 *     summary: Unban a user by ID (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to unban
 *     responses:
 *       200:
 *         description: User unbanned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کاربر با موفقیت از حالت مسدود خارج شد"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     mobile:
 *                       type: string
 *                       example: "09132325454"
 *                     full_name:
 *                       type: string
 *                       example: "Ali"
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     is_banned:
 *                       type: boolean
 *                       example: false
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-04T10:03:09.000Z"
 *       404:
 *         description: User not found
 */
