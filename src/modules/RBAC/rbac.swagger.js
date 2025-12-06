/**
 * @swagger
 * tags:
 *   name: RBAC 🔐
 *   description: Role-based access control APIs
 */

/* -------------------------------------------------------------
   📌 Create Role (POST /rbac/roles)
-------------------------------------------------------------- */
/**
 * @swagger
 * /permission/add:
 *   post:
 *     summary: Create a new role
 *     tags: [RBAC 🔐]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "admin"
 *                 description: Role title
 *               description:
 *                 type: string
 *                 example: "Administrator role with full permissions"
 *                 description: Role description
 *
 *     responses:
 *       201:
 *         description: Role created successfully
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
 *                   example: "Role created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "admin"
 *                     description:
 *                       type: string
 *                       example: "Administrator role with full permissions"
 *
 *       400:
 *         description: Invalid input or role already exists
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
 *                   example: "Role title is required or already exists"
 */
