import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mobile: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    full_name: { type: DataTypes.STRING(100), allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    is_banned: { type: DataTypes.BOOLEAN, defaultValue: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: true, createdAt: 'created_at', updatedAt: false, modelName: 'user', tableName: 'users' });

const OTP = sequelize.define('OTP', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    code: { type: DataTypes.STRING(6), allowNull: false },
    expires_in: { type: DataTypes.DATE, allowNull: false },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false, modelName: 'otp' });

export { User, OTP }