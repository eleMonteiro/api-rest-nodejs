const { DataTypes } = require("sequelize");
const sequelize = require("@repositories/db");

const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Role;
