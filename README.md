# Store Management API

## 📌 Description

Store Management is a **production-ready RESTful API** built with **Node.js** and **Express.js** for managing an online store.
The project is designed with **clean architecture**, **modular structure**, and **enterprise-level security** in mind.

It includes advanced features such as **authentication with OTP**, **role & permission based access control (RBAC)**, **product & order management**, **payment integration (Zarinpal)**, **blogs, comments, discounts**, and **admin-level controls**.

---

## 🚀 Features

* 🔐 Authentication & Authorization (JWT + Cookies)
* 📱 OTP-based login system
* 🧩 Role-Based Access Control (RBAC)
* 👤 User & Role management
* 🗂 Category & Product management
* 🛒 Basket (Cart) system
* 📦 Order processing & status management
* 💳 Online payment integration (Zarinpal)
* 📝 Blog & Comment system
* 🎯 Discount management
* 🔔 Notification system
* 📸 Image upload (Products & Blogs)
* 📑 Swagger API Documentation
* ⚠ Centralized error handling

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **Sequelize ORM**
* **JWT Authentication**
* **RBAC (Roles & Permissions)**
* **Multer (File Upload)**
* **Swagger (API Docs)**
* **Joi (Validation)**
* **Zarinpal Payment Gateway**

---

## 📂 Project Structure

```bash
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── category/
│   ├── product/
│   ├── basket/
│   ├── order/
│   ├── payment/
│   ├── blog/
│   ├── comment/
│   ├── discount/
│   ├── notification/
│   └── RBAC/
├── middlewares/
│   ├── guard/
│   ├── upload/
│   └── validate/
├── configs/
├── constants/
├── exception/
└── app.js
```

---

## 🔐 Roles & Permissions

* **ADMIN**
* **USER**

RBAC is implemented using:

* Roles
* Permissions
* Role-Permission relations
* User-Role relations

All sensitive routes are protected using:

* `authGuard`
* `rbacGuard`

---

## 💳 Payment System

* Integrated with **Zarinpal Gateway**
* Secure payment request & verification
* Automatic order & payment status update

---

## 📑 API Documentation

Swagger is enabled.

After running the project, open:

```
http://localhost:3000
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the project based on `.env.example` and configure the following variables:

```env
PORT=3000
NODE_ENV=development

# Database
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=store-managment

# JWT
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

# ZARINPAL
ZARINPAL_REQUEST_URL=https://sandbox.zarinpal.com/pg/v4/payment/request.json
ZARINPAL_VERIFY_URL=https://sandbox.zarinpal.com/pg/v4/payment/verify.json
ZARINPAL_GATEWAY_URL=https://sandbox.zarinpal.com/pg/StartPay
ZARINPAL_CALLBACK_URL=http://localhost:3000/payment/verify
ZARINPAL_MERCHANT_ID=your_merchant_id
```

env
PORT=3000
NODE_ENV=development
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=store_db
ACCESS_TOKEN_SECRET=your_secret
ZARINPAL_MERCHANT_ID=xxxx
ZARINPAL_REQUEST_URL=[https://api.zarinpal.com/pg/v4/payment/request.json](https://api.zarinpal.com/pg/v4/payment/request.json)
ZARINPAL_VERIFY_URL=[https://api.zarinpal.com/pg/v4/payment/verify.json](https://api.zarinpal.com/pg/v4/payment/verify.json)
ZARINPAL_GATEWAY_URL=[https://www.zarinpal.com/pg/StartPay](https://www.zarinpal.com/pg/StartPay)

````

---

## ▶️ Installation & Run
```bash
npm install
npm run dev
````

---

## 🧪 Default Admin Setup

* Admin role & permissions are automatically seeded on startup
* All users with `isAdmin = true` receive **Admin role** automatically

---

## 📑 Pagination Utility

This project includes a reusable pagination helper located at:

```bash
src/utils/pagination.js
```

### Features

* Page & limit validation
* Offset calculation
* Total pages calculation
* Consistent API response format

Example response structure:

```json
{
  "totalItems": 120,
  "totalPages": 12,
  "currentPage": 1,
  "limit": 10,
  "products": []
}
```

---

## 🎯 Project Goals

## 👤 Author

Developed by **[Your Name]**

---

## ⭐ Notes

This project is suitable for:

* Portfolio showcase
* Production-ready backend template
* Team-based e-commerce systems
