import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { OrderStatus } from "../../constant/order_status.constant.js";

const Order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    final_amount: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(OrderStatus)),
        defaultValue: OrderStatus.PENDING,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shipping_address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: "orders",
    timestamps: true,
});


const OrderItem = sequelize.define("order_item", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    tableName: "order_items",
    timestamps: true,
});

export { Order, OrderItem };
