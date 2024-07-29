module.exports = (sequelize, DataTypes) => {
    const OrderFoodItem = sequelize.define('OrderFoodItem', {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Orders',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'FoodItems',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    });

    OrderFoodItem.associate = (models) => {
        OrderFoodItem.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order'
        });

        OrderFoodItem.belongsTo(models.FoodItem, {
            foreignKey: 'itemId',
            as: 'item'
        });
    };

    return OrderFoodItem;
};
