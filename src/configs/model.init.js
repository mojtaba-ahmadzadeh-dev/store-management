import { sequelize } from "./sequelize.config.js";

import { User } from "../modules/user/user.model.js";
import { Product } from "../modules/product/product.modle.js";
import { Category } from "../modules/category/category.model.js";
import { Basket } from "../modules/basket/basket.model.js";
import { Order, OrderItem } from "../modules/order/order.model.js";
import { Payment } from "../modules/payment/payment.model.js";
import { Role, Permission, RolePermission, UserRole } from "../modules/RBAC/rbac.model.js";
import { Blog } from "../modules/blog/blog.model.js";
import { Comment } from "../modules/comment/comment.model.js";
import { Discount } from "../modules/discount/discount.model.js";
import { Notfication } from "../modules/notfication/notfication.model.js";

const initDatabase = async () => {

    // USER
    User.hasMany(Basket, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'baskets' });
    Basket.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'orders' });
    Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    User.hasMany(Payment, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'payments' });
    Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    // CATEGORY & PRODUCT
    Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE', as: 'products' });
    Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

    // BASKET
    Product.hasMany(Basket, { foreignKey: 'product_id', onDelete: 'CASCADE', as: 'basketItems' });
    Basket.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });


    // ORDER
    Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE', as: 'items' });
    OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

    Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
    OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

    // PAYMENT
    Order.hasOne(Payment, { foreignKey: 'order_id', onDelete: 'CASCADE', as: 'payment' });
    Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

    // RBAC
    User.belongsToMany(Role, { through: UserRole, as: 'roles', foreignKey: 'userId' });
    Role.belongsToMany(User, { through: UserRole, as: 'users', foreignKey: 'roleId' });

    User.hasMany(Blog, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Blog.belongsTo(User, { foreignKey: 'user_id' });

    Blog.hasMany(Comment, { foreignKey: 'blog_id', as: 'comments' });
    Comment.belongsTo(Blog, { foreignKey: 'blog_id', as: 'blog' });

    Product.hasMany(Comment, { foreignKey: 'product_id', as: 'comments' });
    Comment.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

    Product.hasMany(Discount, { foreignKey: "product_id", onDelete: "SET NULL" });
    Discount.belongsTo(Product, { foreignKey: "product_id" });

    User.hasMany(Discount, { foreignKey: "user_id", onDelete: "SET NULL" });
    Discount.belongsTo(User, { foreignKey: "user_id" });

    User.hasMany(Notfication, { foreignKey: "user_id", onDelete: "CASCADE" });
    Notfication.belongsTo(User, { foreignKey: "user_id" });

    Role.belongsToMany(Permission, { through: RolePermission, as: "permissions", foreignKey: "roleId" });
    Permission.belongsToMany(Role, { through: RolePermission, as: "roles", foreignKey: "permissionId" });


    // await sequelize.sync({ alter: true });
    // console.log('Database synced successfully');
};

export { initDatabase }