import { sequelize } from "./db.js";

import "../../models/user.js";
import "../../models/dish.js";
import "../../models/address.js";
import "../../models/demand.js";
import "../../models/item.js";

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (error) {
    throw new Error("Error connecting to the database");
  }
})();
