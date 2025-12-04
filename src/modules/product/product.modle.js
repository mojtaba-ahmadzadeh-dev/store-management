import { sequelize } from "../../configs/sequelize.config.js";
import { DataTypes } from "sequelize";
import { Category } from "../category/category.model.js";
import { CATEGORY_STATUS } from "../../constant/category_status.constant.js";

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM(CATEGORY_STATUS.ACTIVE, CATEGORY_STATUS.INACTIVE),
        allowNull: true,
        defaultValue: CATEGORY_STATUS.ACTIVE,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
}, {
    modelName: 'product',
    timestamps: true,
});

export { Product };