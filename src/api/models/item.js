import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";

const Item = define("itens", {
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
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  dishId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "dishes",
      key: "id",
    },
  },
  demandId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "demands",
      key: "id",
    },
  },
});

export default Item;
