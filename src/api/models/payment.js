import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";

const Payment = define("payments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["DINHEIRO", "CREDITO", "DEBITO", "PIX", "BOLETO"]],
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  demandId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "demands",
      key: "id",
    },
  },
  cardId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "cards",
      key: "id",
    },
  },
});

export default Payment;
