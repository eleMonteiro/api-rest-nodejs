import { DataTypes } from "sequelize";
import { define } from "../repositories/db.js";

const RoleUsers = define("roleUsers", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
  roleId: {
    type: DataTypes.STRING,
    references: {
      model: "roles",
      key: "id",
    },
  },
});

export default RoleUsers;
