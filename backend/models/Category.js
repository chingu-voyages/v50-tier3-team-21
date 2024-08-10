module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        displayName: {
            type: DataTypes.VIRTUAL,
            get() {
                const name = this.getDataValue('name');
                return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }
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
