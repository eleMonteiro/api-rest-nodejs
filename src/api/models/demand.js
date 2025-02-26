const { DataTypes } = require("sequelize");
const sequelize = require("@repositories/db");
const Item = require("@models/item");

const Demand = sequelize.define("demands", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfDemand: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Demand.hasMany(Item);

module.exports = Demand;
