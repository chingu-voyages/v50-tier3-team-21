const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deliveryDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        deliveryTime: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        tip: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        finalized: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        cancelled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Order;
};
