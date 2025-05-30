import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";

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
    allowNull: true,
  },
  dateOfDemand: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  deliveryMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "RETIRADA",
    validate: {
      isIn: [["RETIRADA", "ENTREGA"]],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "PENDENTE",
    validate: {
      isIn: [
        [
          "PENDENTE",
          "RECEBIDO",
          "EM_PREPARACAO",
          "PRONTO_PARA_RETIRADA",
          "PRONTO_PARA_ENTREGA",
          "ENTREGUE",
          "CANCELADO",
        ],
      ],
    },
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

export default Demand;
