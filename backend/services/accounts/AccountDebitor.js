class AccountDebitor{
  constructor(amount, account, db) {
    this.amount = amount;
    this.account = account;
    this.db = db;
  }

  perform = async () => {
    const currentBalance = Number(this.account.balance);
    const debitAmount = (Number(this.amount)*100);
     if (currentBalance < debitAmount) {
      throw new Error("Account balance is less that requested amount");
     }
  
     this.account.balance = currentBalance - debitAmount;
   
     await this.account.save();

  }
}

module.exports = {
  AccountDebitor,
}
