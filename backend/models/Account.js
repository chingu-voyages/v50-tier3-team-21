module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
      balance: {
          type: DataTypes.DECIMAL(10, 2),
          defaultValue: 0.00,
          validate: {
            isDecimal: {
                msg: 'Balance must be a valid decimal number.'
            },
            min: {
                args: [0],
                msg: 'Balance must be a non-negative number.'
            },
            max: {
                args: [1000000],
                msg: 'Balance cannot exceed 1,000,000.'
            }
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
  }
);

Account.associate = (models) => {
  Account.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });

  Account.hasMany(models.Transaction, {
    foreignKey: 'accountId',
    as: 'transactions'
  });
};

  return Account;
};