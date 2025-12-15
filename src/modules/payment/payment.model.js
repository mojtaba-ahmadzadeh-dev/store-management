import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { Order } from "../order/order.model.js";
import { PaymentStatus } from "../../constant/payment_status.constant.js";
import { User } from "../user/user.model.js";

const Payment = sequelize.define("payment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "online",
    },
    authority: {            // اضافه شد
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    status: {
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        allowNull: false,
        defaultValue: PaymentStatus.PENDING,
    },
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "payments",
    timestamps: true,
});

export { Payment };