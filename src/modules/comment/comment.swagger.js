/**
 * @swagger
 * tags:
 *   name: Comments 💬
 *   description: APIs for creating and fetching comments for blogs and products
 */

/* -------------------------------------------------------------
   📌 Create Comment (POST /comments)
-------------------------------------------------------------- */
/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new comment for a blog or product
 *     tags: [Comments 💬]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "این یک کامنت تستی است."
 *               blog_id:
 *                 type: integer
 *                 example: 1
 *                 description: شناسه بلاگی که کامنت برای آن ایجاد می‌شود
 *               product_id:
 *                 type: integer
 *                 example: 2
 *                 description: شناسه محصولی که کامنت برای آن ایجاد می‌شود
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment created successfully"
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     content:
 *                       type: string
 *                     user_id:
 *                       type: integer
 *                     blog_id:
 *                       type: integer
 *                     product_id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Content or blog_id/product_id is missing
 *       401:
 *         description: User not authenticated
 */

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: Get all comments
 *     description: Returns a list of all submitted comments.
 *     tags: [Comments 💬]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comments retrieved successfully."
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       content:
 *                         type: string
 *                         example: "This is a test comment."
 *                       user_id:
 *                         type: integer
 *                         example: 5
 *                       blog_id:
 *                         type: integer
 *                         example: 2
 *                       product_id:
 *                         type: integer
 *                         example: null
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-01T12:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-01T12:00:00.000Z"
 */

/**
 * @swagger
 * /comment/{id}:
 *   patch:
 *     summary: Update a comment
 *     description: Allows the owner of a comment to edit it.
 *     tags: [Comments 💬]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated comment text."
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Content missing
 *       403:
 *         description: Access denied
 *       404:
 *         description: Comment not found
 */
