import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";
import Addresses from "./address.js";
import Role from "./role.js";
import RoleUsers from "./roleUsers.js";
import Demand from "./demand.js";

const User = define("users", {
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
  cpf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Addresses);
User.hasMany(Demand);
User.belongsToMany(Role, { through: RoleUsers });
Role.belongsToMany(User, { through: RoleUsers });

export default User;
