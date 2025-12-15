import { sequelize } from "./sequelize.config.js";

import { User } from "../modules/user/user.model.js";
import { Product } from "../modules/product/product.modle.js";
import { Category } from "../modules/category/category.model.js";
import { Basket } from "../modules/basket/basket.model.js";
import { Order, OrderItem } from "../modules/order/order.model.js";
import { Payment } from "../modules/payment/payment.model.js";
import { Permission, Role, RolePermissions } from "../modules/RBAC/rbac.model.js";

const initDatabase = async () => {

    /* ===================== USER ===================== */
    User.hasMany(Basket, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'baskets'
    });
    Basket.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    User.hasMany(Order, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'orders'
    });
    Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    User.hasMany(Payment, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'payments'
    });
    Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    /* ===================== CATEGORY & PRODUCT ===================== */
    Category.hasMany(Product, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE',
        as: 'products'
    });
    Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

    /* ===================== BASKET ===================== */
    Product.hasMany(Basket, {
        foreignKey: 'product_id',
        onDelete: 'CASCADE',
        as: 'basketItems'
    });
    Basket.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

    /* ===================== ORDER ===================== */
    Order.hasMany(OrderItem, {
        foreignKey: 'order_id',
        onDelete: 'CASCADE',
        as: 'items'
    });
    OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

    Product.hasMany(OrderItem, {
        foreignKey: 'product_id',
        as: 'orderItems'
    });
    OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

    /* ===================== PAYMENT ===================== */
    Order.hasOne(Payment, {
        foreignKey: 'order_id',
        onDelete: 'CASCADE',
        as: 'payment'
    });
    Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

    /* ===================== RBAC ===================== */
    Role.belongsToMany(Permission, {
        through: RolePermissions,
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions'
    });

    Permission.belongsToMany(Role, {
        through: RolePermissions,
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles'
    });

    // Payment.sync()

    /* ===================== SYNC (اختیاری) ===================== */
    // await sequelize.sync({ alter: true });
    // console.log('Database synced successfully');
};

export { initDatabase };
