class AccountCreditor{
  constructor(amount, account){
    this.amount = amount;
    this.account = account;
  }

  perform = async () => {
    try {
     this.account.balance = Number(this.account.balance) + (Number(this.amount)*100);
   
     await this.account.save();
      return true;
    } catch(error) {
     throw new Error(error.message);
    }
   }
};

module.exports = {
  AccountCreditor,
}