module.exports = (sequelize, DataTypes) => {
    const FoodItem = sequelize.define('FoodItem', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        restaurantID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
           
            },
            references: {
                model: 'Restaurant',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        category: {
            // foreign key from category
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            references: {
                model: 'Category',
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
    return FoodItem;
}
