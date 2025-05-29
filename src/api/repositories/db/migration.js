import dotenv from "dotenv";
import path from "path";
import { sequelize, DB_TYPE } from "./db.js";
import pg from "pg";
import mysql from "mysql2/promise"; // async
import "../../models/associations.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function ensureDatabaseExists() {
  if (DB_TYPE === "postgres") {
    const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DB } = process.env;

    const client = new pg.Client({
      host: PG_HOST || "localhost",
      port: PG_PORT || 5432,
      user: PG_USER || "root",
      password: PG_PASSWORD || "root",
      database: "postgres",
    });

    await client.connect();

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [PG_DB]
    );

    if (res.rowCount === 0) {
      console.log(`🆕 Criando banco PostgreSQL: ${PG_DB}`);
      await client.query(`CREATE DATABASE "${PG_DB}"`);
    }

    await client.end();
  } else if (DB_TYPE === "mysql") {
    const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } =
      process.env;

    const connection = await mysql.createConnection({
      host: MYSQL_HOST || "localhost",
      port: MYSQL_PORT || 3306,
      user: MYSQL_USER || "root",
      password: MYSQL_PASSWORD || "root",
    });

    const [rows] = await connection.query(`SHOW DATABASES LIKE ?`, [MYSQL_DB]);

    if (rows.length === 0) {
      console.log(`🆕 Criando banco MySQL: ${MYSQL_DB}`);
      await connection.query(`CREATE DATABASE \`${MYSQL_DB}\``);
    }

    await connection.end();
  }
}

(async () => {
  try {
    console.log(`🔄 Iniciando migração para ${DB_TYPE}...`);

    await ensureDatabaseExists();

    await sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso");

    const syncOptions = {
      alter: true,
      logging: console.log,
    };

    await sequelize.sync(syncOptions);
    console.log("🔄 Modelos sincronizados com sucesso");

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro durante a migração:", error.message);
    console.error("Detalhes:", error);
    process.exit(1);
  }
})();
