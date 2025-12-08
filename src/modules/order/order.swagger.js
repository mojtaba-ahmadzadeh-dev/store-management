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

/**
 * @swagger
 * /order/admin:
 *   get:
 *     summary: Get all orders (Admin Only)
 *     tags: [Order 📦]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "لیست تمام سفارش‌ها با موفقیت دریافت شد"
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       total_price:
 *                         type: number
 *                       status:
 *                         type: string
 *                       payment_method:
 *                         type: string
 *                       shipping_address:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product_id:
 *                               type: integer
 *                             quantity:
 *                               type: integer
 *                             price:
 *                               type: number
 */

/**
 * @swagger
 * /order/update/{id}:
 *   patch:
 *     summary: Update an existing order (shipping address, payment method, or status)
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               shipping_address:
 *                 type: string
 *                 example: "تهران، خیابان ولیعصر، پلاک 123"
 *               payment_method:
 *                 type: string
 *                 example: "online"
 *               status:
 *                 type: string
 *                 example: "shipped"
 *                 description: "Order status (pending, shipped, completed, cancelled)"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سفارش با موفقیت آپدیت شد"
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
 *                     status:
 *                       type: string
 *                       example: "shipped"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سفارش یافت نشد"
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
   📌 Delete Order (DELETE /order/{id})
-------------------------------------------------------------- */
/**
 * @swagger
 * /order/delete/{id}:
 *   delete:
 *     summary: Delete an existing order (user must own the order or admin)
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
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سفارش با موفقیت حذف شد"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     total_price:
 *                       type: number
 *                     payment_method:
 *                       type: string
 *                     shipping_address:
 *                       type: string
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */

/**
 * @swagger
 * /order/update-status/{id}:
 *   put:
 *     summary: Update only the status of an existing order (Admin or Owner)
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "shipped"
 *                 description: "Order status (pending, shipped, completed, cancelled)"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سفارش با موفقیت آپدیت شد"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     status:
 *                       type: string
 *                       example: "shipped"
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
 *       403:
 *         description: Unauthorized to update this order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "شما اجازه تغییر وضعیت این سفارش را ندارید"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "سفارش یافت نشد"
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
