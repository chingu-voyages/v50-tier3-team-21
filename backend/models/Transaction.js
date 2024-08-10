const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
      amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
      },
      type: {
        type: DataTypes.ENUM('credit', 'debit'),
        allowNull: false
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Accounts',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      status: {
        type: DataTypes.ENUM('incomplete', 'completed'),
        allowNull: false
      },
      paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: 'account'
    });
  };

  return Transaction;
}
