/**
 * @swagger
 * tags:
 *   name: Category 📂
 *   description: Category management APIs
 */

/* -------------------------------------------------------------
   📌 Create Category (POST /categories)
-------------------------------------------------------------- */
/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category 📂]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "دسته‌بندی جدید"
 *                 description: Title of the category
 *               description:
 *                 type: string
 *                 example: "توضیحات دسته‌بندی"
 *                 description: Optional description for the category
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *                 example: "ACTIVE"
 *                 description: Status of the category
 *
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "دسته‌بندی جدید"
 *                     description:
 *                       type: string
 *                       example: "توضیحات دسته‌بندی"
 *                     status:
 *                       type: string
 *                       example: "ACTIVE"
 *
 *       400:
 *         description: Title is required or category already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Title is required"
 *
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

/* -------------------------------------------------------------
   📌 Get All Categories (GET /category/all)
-------------------------------------------------------------- */
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get the list of all categories
 *     tags: [Category 📂]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categories retrieved successfully"
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
 *                         example: "New Category"
 *                       description:
 *                         type: string
 *                         example: "Category description"
 *                       status:
 *                         type: string
 *                         example: "ACTIVE"
 *
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
