/**
 * @swagger
 * tags:
 *   name: Basket 🛒
 *   description: APIs for managing user's basket
 */

/* -------------------------------------------------------------
   📌 Add Product to Basket (POST /basket/add)
-------------------------------------------------------------- */
/**
 * @swagger
 * /basket/add:
 *   post:
 *     summary: Add a product to the user's basket
 *     tags: [Basket 🛒]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the product to add
 *               quantity:
 *                 type: integer
 *                 example: 2
 *                 description: Number of products to add (default 1)
 *
 *     responses:
 *       200:
 *         description: Product added to basket successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product added to basket successfully"
 *                 basketItem:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     total_price:
 *                       type: number
 *
 *       400:
 *         description: Product ID is required
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product ID is required"
 *
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/* -------------------------------------------------------------
📌 Remove Product from Basket (DELETE /basket/remove)
-------------------------------------------------------------- */
/**
 * @swagger
 * /basket/delete:
 *   delete:
 *     summary: Remove a product completely from the user's basket
 *     tags: [Basket 🛒]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 24
 *                 description: ID of the product to remove from basket
 *
 *     responses:
 *       200:
 *         description: Product removed from basket successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "محصول از سبد خرید حذف شد"
 *                 result:
 *                   type: object
 *                   properties:
 *                     removed:
 *                       type: boolean
 *                       example: true
 *
 *       400:
 *         description: productId not provided or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "شناسه محصول لازم است"
 *
 *       404:
 *         description: Product does not exist in user's basket
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "محصول مورد نظر یافت نشد"
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
   📌 Get User Basket (GET /basket)
-------------------------------------------------------------- */
/**
 * @swagger
 * /basket:
 *   get:
 *     summary: Get current user's basket
 *     tags: [Basket 🛒]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Returns the user's basket items or empty basket
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: "سبد خرید کاربر"
 *                     basket:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               user_id:
 *                                 type: integer
 *                                 example: 1
 *                               product_id:
 *                                 type: integer
 *                                 example: 24
 *                               quantity:
 *                                 type: integer
 *                                 example: 2
 *                               total_price:
 *                                 type: number
 *                                 example: 64.4
 *                               product:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                     example: 24
 *                                   name:
 *                                     type: string
 *                                     example: "محصول تست"
 *                                   price:
 *                                     type: number
 *                                     example: 32.2
 *                                   description:
 *                                     type: string
 *                                     example: "توضیحات محصول"
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: "سبد خرید خالی است"
 *                     basket:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                           items: {}
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
