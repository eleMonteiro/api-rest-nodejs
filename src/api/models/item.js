import { DataTypes } from "sequelize";
import { define } from "@repositories/db";

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
});

export default Item;
