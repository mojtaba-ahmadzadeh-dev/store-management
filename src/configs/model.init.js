import { sequelize } from "./sequelize.config.js";
import { User } from "../modules/user/user.model.js";
import { Product } from "../modules/product/product.modle.js";
import { Category } from "../modules/category/category.model.js";
import { Basket } from "../modules/basket/basket.model.js";
import { Order, OrderItem } from "../modules/order/order.model.js";

import { Role, Permission, RolePermission, UserRole } from "../modules/RBAC/rbac.model.js";
import { Blog } from "../modules/blog/blog.model.js";
import { Comment } from "../modules/comment/comment.model.js";
import { Discount } from "../modules/discount/discount.model.js";
import { Notfication } from "../modules/notfication/notfication.model.js";



const initDatabase = async () => {
    User.hasMany(Basket, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Basket.belongsTo(User, { foreignKey: 'user_id' });

    User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Order.belongsTo(User, { foreignKey: 'user_id' });

    Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE' });
    Product.belongsTo(Category, { foreignKey: 'category_id' });

    Product.hasMany(Basket, { foreignKey: 'product_id', onDelete: 'CASCADE' });
    Basket.belongsTo(Product, { foreignKey: 'product_id' });

    Product.hasMany(OrderItem, { foreignKey: 'product_id' });
    OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

    Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
    OrderItem.belongsTo(Order, { foreignKey: 'order_id' });


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
    Role.belongsToMany(Permission, {
        through: RolePermission,
        as: "permissions",
        foreignKey: "roleId"
    });

    Permission.belongsToMany(Role, {
        through: RolePermission,
        as: "roles",
        foreignKey: "permissionId"
    });

    // await sequelize.sync({ alter: true });
}

export { initDatabase }