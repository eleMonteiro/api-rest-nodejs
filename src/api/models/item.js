const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");

const Item = sequelize.define("itens", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = Item;
