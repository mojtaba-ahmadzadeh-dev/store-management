import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { USER_ROLES } from "../../constant/roles.constant.js";

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mobile: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    full_name: { type: DataTypes.STRING(100), allowNull: true },
    email: { type: DataTypes.STRING(150), allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    role: { type: DataTypes.ENUM(USER_ROLES.USER, USER_ROLES.ADMIN), defaultValue: USER_ROLES.USER },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false, modelName: 'user', tableName: 'users' });

const OTP = sequelize.define('otp', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    code: { type: DataTypes.STRING(6), allowNull: false },
    expires_in: { type: DataTypes.DATE, allowNull: false },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false, modelName: 'otp' });

export { User, OTP }