import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";

const Card = define("cards", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardHolderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

export default Card;