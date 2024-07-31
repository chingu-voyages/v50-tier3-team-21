const db = require("../models");

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const account = await db.Account.findOne({
      where: { userId },
      include: {
        model: db.Transaction,
        as: 'transactions'
      }
    });
    
    const transactions = account.transactions;
  return res.status(200).json({
    status: "success",
    data: transactions
   });
  } catch(error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getTransactions,
};