import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { User } from "../user/user.model.js";
import { STATUS } from "../../constant/status.constant.js";
import { Product } from "../product/product.modle.js";

const Discount = sequelize.define(
    "discount",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        percentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        max_usage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },

        used_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        expire_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM(STATUS.ACTIVE, STATUS.INACTIVE),
            defaultValue: STATUS.ACTIVE,
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Product,
                key: "id",
            },
            onDelete: "SET NULL",
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: "id",
            },
            onDelete: "SET NULL",
        },
    },
    {
        tableName: "discounts",
        timestamps: true,
    }
);

export { Discount };