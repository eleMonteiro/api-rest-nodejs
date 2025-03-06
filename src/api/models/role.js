import { DataTypes } from "sequelize";
import { define } from "@repositories/db";

const Role = define("roles", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

export default Role;
