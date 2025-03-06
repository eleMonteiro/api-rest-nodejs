import { DataTypes } from "sequelize";
import { define } from "@repositories/db";
import Role from "@models/role";
import User from "@models/user";

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
      model: User,
      key: "id",
      primaryKey: true,
    },
  },
  roleId: {
    type: DataTypes.STRING,
    references: {
      model: Role,
      key: "id",
      primaryKey: true,
    },
  },
});

export default RoleUsers;
