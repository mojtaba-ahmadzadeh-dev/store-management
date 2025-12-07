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

/* -------------------------------------------------------------
   📌 Update Permission (PUT /permission/update/{id})
-------------------------------------------------------------- */
/**
 * @swagger
 * /permission/update/{id}:
 *   put:
 *     summary: Update an existing Permission
 *     tags: [RBAC 🔑]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Permission to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "read_users"
 *                 description: Updated name of the permission
 *               description:
 *                 type: string
 *                 example: "Updated permission to view users"
 *
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permission updated successfully"
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
 *         description: Error updating Permission (e.g., duplicate name)
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
 *
 *       404:
 *         description: Permission not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permission not found"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/* -------------------------------------------------------------
   📌 Delete Permission (DELETE /permission/delete/{id})
-------------------------------------------------------------- */
/**
 * @swagger
 * /permission/delete/{id}:
 *   delete:
 *     summary: Delete a Permission by ID
 *     tags: [RBAC 🔑]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Permission to delete
 *
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permission deleted successfully"
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
 *       404:
 *         description: Permission not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permission not found"
 *                 success:
 *                   type: boolean
 *                   example: false
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

/* -------------------------------------------------------------
   📌 Create Role (POST /role/add)
-------------------------------------------------------------- */
/**
 * @swagger
 * /role/add:
 *   post:
 *     summary: Create a new Role
 *     tags: [RBAC 🔑]
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
 *                 example: "Admin"
 *                 description: Title of the role
 *               description:
 *                 type: string
 *                 example: "Administrator role with full permissions"
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of permission IDs to assign to the role
 *
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *
 *       400:
 *         description: Error creating Role (e.g., duplicate title)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role with title 'Admin' already exists"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/* -------------------------------------------------------------
   📌 Get All Roles (GET /roles)
-------------------------------------------------------------- */
/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all Roles with their Permissions
 *     tags: [RBAC 🔑]
 *
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Roles fetched successfully"
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
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       permissions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                             description:
 *                               type: string
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
