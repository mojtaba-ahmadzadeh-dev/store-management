import { sequelize } from "../../configs/sequelize.config.js";
import { DataTypes } from "sequelize";
import { User } from "../user/user.model.js";
import { Product } from "../product/product.modle.js";

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    modelName: 'basket',
    timestamps: true,
});



export { Basket };
