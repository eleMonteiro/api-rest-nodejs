import { sequelize } from "../repositories/db/db.js";
import Dish from "./dish.js";
import Item from "./item.js";

Dish.hasMany(Item, { foreignKey: "dishId" });
Item.belongsTo(Dish, { foreignKey: "dishId" });

export { Dish, Item, sequelize };
