import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { USER_ROLES } from "../../constant/roles.constant.js";

const OTP = sequelize.define('otp', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER(6), allowNull: false, references: { model: User, key: 'id' }, onDelete: 'CASCADE' },
    code: { type: DataTypes.STRING(6), allowNull: false },
    expires_in: { type: DataTypes.DATE, allowNull: false },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false, modelName: 'otp' })

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    role: { type: DataTypes.ENUM(USER_ROLES.USER, USER_ROLES.ADMIN), defaultValue: USER_ROLES.USER },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false, modelName: 'user' })

export { User, OTP }