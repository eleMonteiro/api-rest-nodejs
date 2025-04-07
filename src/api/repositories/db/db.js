import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import pg from "pg";
import mysql2 from "mysql2";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const DB_TYPE = (process.env.DB_TYPE || "mysql").toLowerCase();

if (!["mysql", "postgres"].includes(DB_TYPE)) {
  throw new Error(`DB_TYPE inválido: '${DB_TYPE}'. Use 'mysql' ou 'postgres'`);
}

const commonConfig = {
  logging: false,
  define: {
    timestamps: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(
  DB_TYPE === "postgres" ? process.env.PG_DB : process.env.MYSQL_DB,
  DB_TYPE === "postgres" ? process.env.PG_USER : process.env.MYSQL_USER,
  DB_TYPE === "postgres" ? process.env.PG_PASSWORD : process.env.MYSQL_PASSWORD,
  {
    ...commonConfig,
    dialect: DB_TYPE,
    host: DB_TYPE === "postgres" ? process.env.PG_HOST : process.env.MYSQL_HOST,
    dialectModule: DB_TYPE === "postgres" ? pg : mysql2,
  }
);

export const define = (modelName, attributes) => {
  return sequelize.define(modelName, attributes);
};

export { sequelize };
