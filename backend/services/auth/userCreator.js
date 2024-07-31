class UserCreator {
  constructor(db, data) {
    this.db = db;
    this.data = data;
  }

  perform = async () => {
    const t = await this.db.sequelize.transaction();
    try {
      const newUser = await this.db.User.create({
        username: this.data.username,
        email: this.data.email,
        password: this.data.password,
        confirmPassword: this.data.confirmPassword,
        firstName: this.data.firstName || null,
        lastName: this.data.lastName || null,
        contact: this.data.contact || null,
      }, { transaction: t });
  
      const account = await this.db.Account.create({ userId: newUser.id }, { transaction: t });
  
      await t.commit();
      return { newUser, account };
    } catch (error) {
      await t.rollback();
      console.error(error);
      throw new Error(error.message);
    } 
  }
}

module.exports = UserCreator;