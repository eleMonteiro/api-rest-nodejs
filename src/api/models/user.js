const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");
const Addresses = require("./address");
const Role = require("./role");
const RoleUsers = require("./roleUsers");
const Demand = require("./demand");

const User = sequelize.define("user", {
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
Role.belongsToMany(User, { through: RoleUsers });

module.exports = User;
