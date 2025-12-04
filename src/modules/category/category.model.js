import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { CATEGORY_STATUS } from "../../constant/category_status.constant.js";

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM(CATEGORY_STATUS.ACTIVE, CATEGORY_STATUS.INACTIVE), allowNull: true, defaultValue: CATEGORY_STATUS.ACTIVE, },
}, { modelName: 'category', timestamps: false })

export { Category }