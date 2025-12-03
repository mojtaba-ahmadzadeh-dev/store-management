/**
 * @swagger
 * tags:
 *   name: Users 👤
 *   description: APIs for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users 👤]
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
 *     tags: [Users 👤]
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