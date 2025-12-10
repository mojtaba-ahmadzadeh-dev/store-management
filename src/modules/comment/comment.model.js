import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";
import { Product } from "../product/product.modle.js";
import { UserStatus } from "../../constant/status.constant.js";

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
        type: DataTypes.ENUM(UserStatus.PENDING, UserStatus.APPROVED, UserStatus.REJECT),
        allowNull: false,
        defaultValue: UserStatus.PENDING,
    },
}, {
    timestamps: true,
    modelName: "comment",
});

export { Comment };