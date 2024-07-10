module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Category.associate = (models) => {
        Category.belongsToMany(models.FoodItem, {
            through: 'FoodItemCategory',
            foreignKey: 'categoryId',
            otherKey: 'foodItemId'
        });
    };

    return Category;
}
