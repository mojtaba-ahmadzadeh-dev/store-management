/**
 * @swagger
 * tags:
 *   name: RBAC 🔑
 *   description: Role & Permission management APIs
 */

/* -------------------------------------------------------------
   📌 Create Permission (POST /rbac/permissions)
-------------------------------------------------------------- */
/**
 * @swagger
 * /permission/add:
 *   post:
 *     summary: Create a new Permission
 *     tags: [RBAC 🔑]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "read_users"
 *                 description: Name of the permission
 *               description:
 *                 type: string
 *                 example: "Permission to view users"
 *
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permission created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *
 *       400:
 *         description: Error creating Permission (e.g., duplicate name)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permission with name 'read_users' already exists"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/* -------------------------------------------------------------
   📌 Get All Permissions (GET /permission/all)
-------------------------------------------------------------- */
/**
 * @swagger
 * /permission:
 *   get:
 *     summary: Get all Permissions
 *     tags: [RBAC 🔑]
 *
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permissions fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
