import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";

const Dish = define("dishes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [
        [
          "ENTRADA",
          "PRATO_PRINCIPAL",
          "SOBREMESA",
          "BEBIDA",
          "LANCHES",
          "PETISCOS",
        ],
      ],
    },
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Dish;
