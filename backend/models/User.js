const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "The username already exists.",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Username cannot be empty."
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot be empty."
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value === this.password) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        } else {
          throw new Error("The passwords don't match.");
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "The email already exists.",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be empty."
        },
        isEmail: {
          args: true,
          msg: "Must be a valid email address."
        }
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return User;
};
