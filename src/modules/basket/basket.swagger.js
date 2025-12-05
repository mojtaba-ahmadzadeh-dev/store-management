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
