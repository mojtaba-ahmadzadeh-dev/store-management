/**
 * @swagger
 * tags:
 *   name: Auth 🔒
 *   description: User authentication and token management APIs
 */

/* -------------------------------------------------------------
   📌 Send OTP (POST /auth/send-otp)
-------------------------------------------------------------- */
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
 *
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تایید با موفقیت ارسال شد."
 *                 result:
 *                   type: object
 *                   properties:
 *                     mobile:
 *                       type: string
 *                     otp:
 *                       type: object
 *                       properties:
 *                         code:
 *                           type: string
 *                           example: "123456"
 *                         expires_in:
 *                           type: string
 *
 *       400:
 *         description: Mobile number is required
 *       404:
 *         description: User not found
 */

/* -------------------------------------------------------------
   📌 Check OTP (POST /auth/check-otp)
-------------------------------------------------------------- */
/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: Verify OTP code and log in user
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
 *               code:
 *                 type: string
 *                 example: "123456"
 *
 *     responses:
 *       200:
 *         description: OTP verified successfully — accessToken returned in response, refreshToken saved in HttpOnly cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تأیید با موفقیت بررسی شد"
 *                 result:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         mobile:
 *                           type: string
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *
 *       400:
 *         description: Invalid OTP code
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کد تأیید نادرست است"
 *
 *       404:
 *         description: User not found
 */

/* -------------------------------------------------------------
   📌 Refresh Token (POST /auth/refresh-token)
-------------------------------------------------------------- */
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token stored in HttpOnly cookie
 *     tags: [Auth 🔒]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "توکن با موفقیت رفرش شد"
 *                 accessToken:
 *                   type: string
 *                   example: "newAccessToken..."
 *
 *       400:
 *         description: Refresh token not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "رفرش توکن پیدا نشد"
 *
 *       401:
 *         description: Refresh token invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "رفرش توکن نامعتبر یا منقضی شده است"
 */