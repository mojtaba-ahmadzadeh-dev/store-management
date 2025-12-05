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
 *     summary: Create a new product
 *     tags: [Product 📦]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *                 description: Product name
 *               description:
 *                 type: string
 *                 example: "Original Sony PS5 controller"
 *               price:
 *                 type: number
 *                 example: 59.9
 *                 description: Product price
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *               category_id:
 *                 type: integer
 *                 example: 2
 *                 description: Attached category ID
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
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-28T12:34:56.000Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-01-28T12:34:56.000Z"
 *
 *       400:
 *         description: Missing required fields or validation error
 *
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
 *     summary: Get all products
 *     tags: [Product 📦]
 *     description: Retrieve a list of all available products
 *
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
 *
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
