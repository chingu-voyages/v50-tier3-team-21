// models/FoodItemCategory.js
module.exports = (sequelize, DataTypes) => {
    const FoodItemCategory = sequelize.define('FoodItemCategory', {
        foodItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'FoodItems',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });
    return FoodItemCategory;
}