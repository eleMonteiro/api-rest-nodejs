import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";
import Item from "./item.js";

const Demand = define("demands", {
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

export default Demand;
