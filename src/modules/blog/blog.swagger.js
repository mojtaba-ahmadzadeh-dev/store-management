/**
 * @swagger
 * tags:
 *   name: Blog 📝
 *   description: Blog management APIs
 */

/* -------------------------------------------------------------
   📌 Create Blog (POST /blogs with file upload)
-------------------------------------------------------------- */
/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create a new blog post with optional thumbnail upload
 *     tags: [Blog 📝]
 *     security:
 *       - bearerAuth: []  # اگر auth middleware JWT داری
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - slug
 *             properties:
 *               title:
 *                 type: string
 *                 example: "How to learn Node.js"
 *                 description: Blog post title
 *               summary:
 *                 type: string
 *                 example: "A quick guide to learn Node.js efficiently."
 *               content:
 *                 type: string
 *                 example: "Full content of the blog goes here..."
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Upload cover image
 *               slug:
 *                 type: string
 *                 example: "how-to-learn-nodejs"
 *                 description: Unique URL-friendly identifier
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: "draft"
 *               category_id:
 *                 type: integer
 *                 example: 3
 *
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog created successfully"
 *                 blog:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "How to learn Node.js"
 *                     slug:
 *                       type: string
 *                       example: "how-to-learn-nodejs"
 *                     content:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 *                       example: "/uploads/products/1692098765432-123456789.png"
 *                     status:
 *                       type: string
 *                       example: "draft"
 *                     category_id:
 *                       type: integer
 *                     author_id:
 *                       type: integer
 *                     views:
 *                       type: integer
 *                       example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *
 *       400:
 *         description: Validation error or slug already exists
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Slug already exists"
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 */

/* -------------------------------------------------------------
   📌 Get All Blogs (GET /blog/all)
-------------------------------------------------------------- */
/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Get list of all blogs
 *     tags: [Blog 📝]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: List of all blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blogs fetched successfully"
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "How to learn Node.js"
 *                       summary:
 *                         type: string
 *                         example: "A quick guide to learn Node.js efficiently."
 *                       slug:
 *                         type: string
 *                         example: "how-to-learn-nodejs"
 *                       thumbnail:
 *                         type: string
 *                         example: "/uploads/blog/1692098765432-123456789.png"
 *                       status:
 *                         type: string
 *                         example: "published"
 *                       category_id:
 *                         type: integer
 *                         example: 3
 *                       author_id:
 *                         type: integer
 *                         example: 12
 *                       views:
 *                         type: integer
 *                         example: 152
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get a blog by its ID
 *     tags: [Blog 📝]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the blog to retrieve
 *     responses:
 *       200:
 *         description: Blog fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "جزئیات بلاگ با موفقیت دریافت شد"
 *                 blog:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "How to learn Node.js"
 *                     summary:
 *                       type: string
 *                       example: "A quick guide to learn Node.js efficiently."
 *                     content:
 *                       type: string
 *                       example: "Full content of the blog goes here..."
 *                     thumbnail:
 *                       type: string
 *                       example: "/uploads/blog/1692098765432-123456789.png"
 *                     slug:
 *                       type: string
 *                       example: "how-to-learn-nodejs"
 *                     status:
 *                       type: string
 *                       example: "draft"
 *                     category_id:
 *                       type: integer
 *                       example: 3
 *                     author_id:
 *                       type: integer
 *                       example: 1
 *                     views:
 *                       type: integer
 *                       example: 152
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "بلاگ پیدا نشد"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 */

/**
 * @swagger
 * /blog/update/{id}:
 *   patch:
 *     summary: Update a blog by ID
 *     tags: [Blog 📝]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title of the blog
 *                 example: "Updated Blog Title"
 *               summary:
 *                 type: string
 *                 example: "Updated summary..."
 *               content:
 *                 type: string
 *                 example: "Updated full content..."
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Upload new cover image
 *               slug:
 *                 type: string
 *                 example: "updated-blog-slug"
 *                 description: Unique URL-friendly identifier
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: "published"
 *               category_id:
 *                 type: integer
 *                 example: 3
 *
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "بلاگ با موفقیت ویرایش شد"
 *                 blog:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Updated Blog Title"
 *                     summary:
 *                       type: string
 *                     content:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 *                       example: "/uploads/blog/1692098765432-123456789.png"
 *                     slug:
 *                       type: string
 *                       example: "updated-blog-slug"
 *                     status:
 *                       type: string
 *                       example: "published"
 *                     category_id:
 *                       type: integer
 *                     author_id:
 *                       type: integer
 *                     views:
 *                       type: integer
 *                       example: 152
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *
 *       400:
 *         description: Validation error or slug already exists
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Slug تکراری است"
 *
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "بلاگ مورد نظر یافت نشد"
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 */
