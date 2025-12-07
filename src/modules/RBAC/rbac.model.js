import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";

const Permission = sequelize.define('Permission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" }
}, {
  tableName: 'permissions',
  timestamps: true
});

const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, defaultValue: "" }
}, {
  tableName: 'roles',
  timestamps: true
});

const RolePermissions = sequelize.define('RolePermissions', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  roleId: {
    type: DataTypes.INTEGER,
    references: { model: Role, key: 'id' },
    onDelete: 'CASCADE'
  },
  permissionId: {
    type: DataTypes.INTEGER,
    references: { model: Permission, key: 'id' },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'role_permissions',
  timestamps: false
});

export { Role, Permission, RolePermissions };
