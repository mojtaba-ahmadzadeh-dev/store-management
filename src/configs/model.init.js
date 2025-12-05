import { Category } from "../modules/category/category.model.js";
import { Product } from "../modules/product/product.modle.js";
import { OTP, User } from "../modules/user/user.model.js";
import { sequelize } from "./sequelize.config.js";

const initDatabase = async () => {
    User.hasMany(OTP, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    OTP.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

    Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE' })
    Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });


    // User.sync()
    // OTP.sync()
    // Product.sync()

    // await sequelize.sync({alter: true})
}

export { initDatabase }