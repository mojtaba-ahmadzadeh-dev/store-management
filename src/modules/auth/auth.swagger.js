/**
 * @swagger
 * tags:
 *   name: Auth 🔒
 *   description: User authentication APIs
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP to a mobile number
 *     tags: [Auth 🔒]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "09121234567"
 *                 description: User's mobile number
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mobile:
 *                   type: string
 *                 otp:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                     expires_in:
 *                       type: integer
 *       400:
 *         description: OTP code not expired yet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP code is not expired yet."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User with this mobile number not found."
 */

/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: Verify OTP code for a mobile number
 *     tags: [Auth 🔒]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - code
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "09121234567"
 *                 description: User's mobile number
 *               code:
 *                 type: string
 *                 example: "123456"
 *                 description: OTP code sent to the user's mobile
 *
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تأیید با موفقیت بررسی شد"
 *                 user:
 *                   type: object
 *                   description: User data
 *                   properties:
 *                     id:
 *                       type: string
 *                     mobile:
 *                       type: string
 *
 *       400:
 *         description: Invalid or expired OTP code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تأیید نادرست است"
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کاربر یافت نشد"
 */