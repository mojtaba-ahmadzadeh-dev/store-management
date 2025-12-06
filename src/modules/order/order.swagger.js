/**
 * @swagger
 * tags:
 *   name: Order 📦
 *   description: APIs for creating and managing orders
 */

/* -------------------------------------------------------------
   📌 Create Order from Basket (POST /order/create)
-------------------------------------------------------------- */
/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new order from the current user's basket
 *     tags: [Order 📦]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - shipping_address
 *               - payment_method
 *             properties:
 *               shipping_address:
 *                 type: string
 *                 example: "تهران، خیابان ولیعصر، پلاک 123"
 *                 description: The shipping address for the order
 *               payment_method:
 *                 type: string
 *                 example: "online"
 *                 description: Payment method for the order (online, cash, etc.)
 *
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سفارش با موفقیت ثبت شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 12
 *                         user_id:
 *                           type: integer
 *                           example: 1
 *                         total_price:
 *                           type: number
 *                           example: 128.4
 *                         payment_method:
 *                           type: string
 *                           example: "online"
 *                         shipping_address:
 *                           type: string
 *                           example: "تهران، خیابان ولیعصر، پلاک 123"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           order_id:
 *                             type: integer
 *                             example: 12
 *                           product_id:
 *                             type: integer
 *                             example: 24
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 32.2
 *
 *       400:
 *         description: Basket is empty or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سبد خرید شما خالی است"
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

/* -------------------------------------------------------------
   📌 Get User Orders (GET /order)
-------------------------------------------------------------- */
/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders of the current user
 *     tags: [Order 📦]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12
 *                       total_price:
 *                         type: number
 *                         example: 128.4
 *                       payment_method:
 *                         type: string
 *                         example: "online"
 *                       shipping_address:
 *                         type: string
 *                         example: "تهران، خیابان ولیعصر، پلاک 123"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       order_items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product_id:
 *                               type: integer
 *                               example: 24
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             price:
 *                               type: number
 *                               example: 32.2
 *                             total_price:
 *                               type: number
 *                               example: 64.4
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get a single order by ID (only if it belongs to the current user)
 *     tags: [Order 📦]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سفارش با موفقیت دریافت شد"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     total_price:
 *                       type: number
 *                       example: 128.4
 *                     payment_method:
 *                       type: string
 *                       example: "online"
 *                     shipping_address:
 *                       type: string
 *                       example: "تهران، خیابان ولیعصر، پلاک 123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     order_items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product_id:
 *                             type: integer
 *                             example: 24
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 32.2
 *                           total_price:
 *                             type: number
 *                             example: 64.4
 *
 *       404:
 *         description: Order not found or does not belong to user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سفارش یافت نشد"
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
