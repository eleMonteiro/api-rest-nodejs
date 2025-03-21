import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";

const Role = define("roles", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

export default Role;
