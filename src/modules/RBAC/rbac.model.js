import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";

const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, defaultValue: "" }
}, {
  modelName: 'role',
  timestamps: false
});

const Permission = sequelize.define('permission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" }
}, {
  modelName: 'permission',
  timestamps: true
});

const RolePermission = sequelize.define('role_permission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  roleId: { type: DataTypes.INTEGER, allowNull: false },
  permissionId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  modelName: 'role_permission',
  timestamps: false
});


export { Role, Permission, RolePermission };