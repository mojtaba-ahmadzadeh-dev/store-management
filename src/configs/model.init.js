import { sequelize } from "./sequelize.config.js";
import { User } from "../modules/user/user.model.js";
import { Product } from "../modules/product/product.modle.js";
import { Category } from "../modules/category/category.model.js";
import { Basket } from "../modules/basket/basket.model.js";
import { Order, OrderItem } from "../modules/order/order.model.js";
import { Permission, Role, RolePermissions } from "../modules/RBAC/rbac.model.js";
import { Blog } from "../modules/blog/blog.model.js";

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

    User.hasMany(Blog, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Blog.belongsTo(User, { foreignKey: 'user_id' });


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
    // Order.sync()

    // Blog.sync()

    // await sequelize.sync({ alter: true });
    // console.log("Database initialized with Order & OrderItem!");
}

export { initDatabase };