import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { Product } from "../product/product.modle.js";
import { OrderStatus } from "../../constant/order_status.constant.js";
import { Blog } from "../blog/blog.model.js";

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Product,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Blog,
            key: 'id',
        },
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM(OrderStatus.PENDING, OrderStatus.APPROVED, OrderStatus.REJECT),
        allowNull: false,
        defaultValue: OrderStatus.PENDING,
    },
}, {
    timestamps: true,
    modelName: "comment",
});

export { Comment };