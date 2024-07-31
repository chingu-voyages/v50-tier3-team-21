class TransactionCreator{
  constructor(data) {
    this.data = data;
  }

  transactionExist = async() => {
    const transaction = await this.data.db.Transaction.findOne({
      where: {paymentIntentId: this.data.paymentIntentId}
    })

    return transaction;
  };

  perform = async () => {
    let transactionStatus = this.data.status === "paid" ? "completed" : "incomplete";
    let transaction = await this.transactionExist();
    if (transaction) {
      transaction.status = this.data.status;

      await transaction.save();
    } else {
      transaction = await this.data.db.Transaction.create({
          amount: this.data.amount, 
          type: this.data.type, 
          accountId: this.data.accountId, 
          status: transactionStatus,
          paymentIntentId: this.data.paymentIntentId,
        }); 
    }
   
    return transaction;
  }
};

  module.exports = {
    TransactionCreator,
  }