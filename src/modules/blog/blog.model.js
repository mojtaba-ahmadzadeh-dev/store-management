import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";

const Blog = sequelize.define('blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    summary: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },

    content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },

    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },

    status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    modelName: "blog",
})

export { Blog }