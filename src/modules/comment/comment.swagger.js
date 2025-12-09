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