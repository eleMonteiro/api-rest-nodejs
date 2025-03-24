import dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    logging: false,
  }
);

export const define = (modelName, attributes) => {
  return sequelize.define(modelName, attributes);
};

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    throw new Error("Error connecting to the database");
  }
})();
