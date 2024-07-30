class AccountCreator {
  constructor(user, db) {
    this.user = user;
    this.db = db;
  };

  perform = async () => {
  const account = await db.Account.create({userId: this.user.id});

  return account;
  }
};

module.exports = AccountCreator;