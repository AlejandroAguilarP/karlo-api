'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    total: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    IVA: DataTypes.INTEGER,
    products: DataTypes.JSON
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Orders',
  });
  return Orders;
};