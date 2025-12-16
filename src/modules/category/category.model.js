import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { STATUS } from "../../constant/status.constant.js";

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM(STATUS.ACTIVE, STATUS.INACTIVE), allowNull: true, defaultValue: STATUS.ACTIVE, },
}, { modelName: 'category', timestamps: false })

export { Category }