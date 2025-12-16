import { sequelize } from "../../configs/sequelize.config.js";
import { DataTypes } from "sequelize";
import { Category } from "../category/category.model.js";
import { STATUS } from "../../constant/status.constant.js";

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
        type: DataTypes.ENUM(STATUS.ACTIVE, STATUS.INACTIVE),
        allowNull: true,
        defaultValue: STATUS.ACTIVE,
    },
    likes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    bookmarked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
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