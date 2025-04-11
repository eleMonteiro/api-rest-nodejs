import { DataTypes } from "sequelize";
import { define } from "../repositories/db/db.js";
import Addresses from "./address.js";
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
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "CLIENTE",
  },
});

User.hasMany(Addresses);
User.hasMany(Demand);

export default User;
