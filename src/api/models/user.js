import { DataTypes } from "sequelize";
import { define } from "@repositories/db";
import Addresses from "@models/address";
import Role, { belongsToMany } from "@models/role";
import RoleUsers from "@models/roleUsers";
import Demand from "@models/demand";

const User = define("user", {
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
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
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
belongsToMany(User, { through: RoleUsers });

export default User;
