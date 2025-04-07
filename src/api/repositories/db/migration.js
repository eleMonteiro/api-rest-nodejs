import dotenv from "dotenv";
import path from "path";
import { sequelize } from "./db.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import "../../models/user.js";
import "../../models/dish.js";
import "../../models/address.js";
import "../../models/demand.js";
import "../../models/item.js";

(async () => {
  try {
    console.log(
      `🔄 Iniciando migração para ${process.env.DB_TYPE || "mysql"}...`
    );

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
