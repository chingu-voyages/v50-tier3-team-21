module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
      balance: {
          type: DataTypes.DECIMAL(10, 2),
          defaultValue: 0.00
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