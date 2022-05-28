"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_name: DataTypes.STRING,
      user_email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'El email ya esta en uso'
        },
        validate: {
          isEmail: {
            msg: 'Debe ser formato Email'
          }
        },
      },
      user_pwd: {
        type: DataTypes.STRING
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      createdAt: "created_on",
      updatedAt: false
    }
  );
  return User;
};
