import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";

const Permission = sequelize.define('permission', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, defaultValue: "" },
}, { tableName: 'permissions', timestamps: true });

const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, defaultValue: "" },
}, { tableName: 'roles', timestamps: true });

const RolePermission = sequelize.define('role_permission', {}, { tableName: 'role_permissions', timestamps: false });

const UserRole = sequelize.define('user_role', {}, { tableName: 'user_roles', timestamps: false });

export { Role, Permission, RolePermission, UserRole };