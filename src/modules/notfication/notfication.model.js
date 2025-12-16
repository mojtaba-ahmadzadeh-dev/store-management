import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/sequelize.config.js";

const Notfication = sequelize.define('notfication', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("info", "order", "comment", "product", "discount"),
        defaultValue: "info",
    },
    related_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'notfications',
    timestamps: true
});

export { Notfication };
