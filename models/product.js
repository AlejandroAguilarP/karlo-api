'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_name: DataTypes.STRING,
    product_price: DataTypes.INTEGER,
    product_quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false
  });
  return Product;
};