module.exports = (sequelize, DataTypes) => {
    const FoodItem = sequelize.define('FoodItem', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Restaurants',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    FoodItem.associate = (models) => {
      FoodItem.belongsTo(models.Restaurant, {
          foreignKey: 'restaurantId',
          as: 'restaurant'
      });

        FoodItem.belongsToMany(models.Category, {
            through: 'FoodItemCategory',
            foreignKey: 'foodItemId',
            otherKey: 'categoryId'
        });
    };

    return FoodItem;
}
