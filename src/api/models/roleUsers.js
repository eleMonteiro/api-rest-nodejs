const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");
const Role = require("./role");
const User = require("./user");

const RoleUsers = sequelize.define("roleUsers", {
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

module.exports = RoleUsers;
