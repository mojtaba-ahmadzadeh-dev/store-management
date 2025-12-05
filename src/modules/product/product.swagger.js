/**
 * @swagger
 * tags:
 *   name: Product 📦
 *   description: Product management APIs
 */

/* -------------------------------------------------------------
   📌 Create Product (POST /products)
-------------------------------------------------------------- */
/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product with optional image upload
 *     tags: [Product 📦]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "PS5 Controller"
 *               description:
 *                 type: string
 *                 example: "Original Sony PS5 controller"
 *               price:
 *                 type: number
 *                 example: 59.9
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *               category_id:
 *                 type: integer
 *                 example: 2
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Product image file
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "PS5 Controller"
 *                     description:
 *                       type: string
 *                       example: "Original Sony PS5 controller"
 *                     price:
 *                       type: number
 *                       example: 59.9
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     category_id:
 *                       type: integer
 *                       example: 2
 *                     image_url:
 *                       type: string
 *                       example: "uploads/ps5-controller.jpg"
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *
 *       400:
 *         description: Missing required fields or validation error
 *       500:
 *         description: Server error while creating product
 */

/* -------------------------------------------------------------
   📌 Get All Products (GET /product/all)
-------------------------------------------------------------- */
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products with advanced filters
 *     tags: [Product 📦]
 *     description: Retrieve a list of products with optional filters like category and popularity.
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Filter products by category ID
 *         example: 2
 *       - in: query
 *         name: min_likes
 *         schema:
 *           type: integer
 *         description: Minimum number of likes
 *         example: 5
 *       - in: query
 *         name: max_likes
 *         schema:
 *           type: integer
 *         description: Maximum number of likes
 *         example: 100
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *           enum: [likes, price, createdAt]
 *         description: Field to sort products by
 *         example: likes
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order
 *         example: DESC
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List of products fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "PS5 Controller"
 *                       description:
 *                         type: string
 *                         example: "Original Sony PS5 controller"
 *                       price:
 *                         type: number
 *                         example: 59.9
 *                       likes:
 *                         type: integer
 *                         example: 10
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       category_id:
 *                         type: integer
 *                         example: 2
 *                       createdAt:
 *                         type: string
 *                         example: "2024-01-28T12:34:56.000Z"
 *                       updatedAt:
 *                         type: string
 *                         example: "2024-01-28T12:34:56.000Z"
 *       500:
 *         description: Server error while fetching products
 */

/* -------------------------------------------------------------
   📌 Get Product by ID (GET /product/{id})
-------------------------------------------------------------- */
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by its ID
 *     tags: [Product 📦]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Product ID
 *
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "PS5 Controller"
 *                     description:
 *                       type: string
 *                       example: "Original Sony PS5 controller"
 *                     price:
 *                       type: number
 *                       example: 59.9
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     category_id:
 *                       type: integer
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *
 *       404:
 *         description: Product not found
 *
 *       500:
 *         description: Server error while fetching product
 */

/* -------------------------------------------------------------
   📌 Delete Product by ID (DELETE /product/{id})
-------------------------------------------------------------- */
/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by its ID
 *     tags: [Product 📦]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Product ID to delete
 *
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "محصول با موفقیت حذف شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "محصول مورد نظر یافت نشد"
 *
 *       500:
 *         description: Server error while deleting product
 */

/**
 * @swagger
 * /product/update/{id}:
 *   patch:
 *     summary: Update a product by its ID
 *     tags: [Product 📦]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "PS5 Controller Pro"
 *                 description: Updated product name
 *               description:
 *                 type: string
 *                 example: "Updated description for PS5 controller"
 *               price:
 *                 type: number
 *                 example: 69.9
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *               category_id:
 *                 type: integer
 *                 example: 2
 *
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "PS5 Controller Pro"
 *                     description:
 *                       type: string
 *                       example: "Updated description for PS5 controller"
 *                     price:
 *                       type: number
 *                       example: 69.9
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     category_id:
 *                       type: integer
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-28T12:34:56.000Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-01-29T09:12:34.000Z"
 *
 *       404:
 *         description: Product not found
 *
 *       500:
 *         description: Server error while updating product
 */

/**
 * @swagger
 * /product/like/{id}:
 *   put:
 *     summary: Like or dislike a product (optional count, default 1)
 *     tags: [Product 📦]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Product ID to like or dislike
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *                 example: 1
 *                 description: Number of likes to add (positive for like, negative for dislike, default 1)
 *     responses:
 *       200:
 *         description: Product liked/disliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product liked successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     likes:
 *                       type: integer
 *                       example: 3
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /product/bookmark/{id}:
 *   put:
 *     summary: Bookmark or unbookmark a product
 *     tags: [Product 📦]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Product ID to bookmark/unbookmark
 *     responses:
 *       200:
 *         description: Product bookmarked/unbookmarked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "محصول با موفقیت نشانک‌گذاری شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     bookmarked:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "محصول مورد نظر وجود ندارد"
 *       500:
 *         description: Server error
 */
