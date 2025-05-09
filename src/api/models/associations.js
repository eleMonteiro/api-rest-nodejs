import { sequelize } from "../repositories/db/db.js";
import User from "./user.js";
import Address from "./address.js";
import Demand from "./demand.js";
import Item from "./item.js";
import Dish from "./dish.js";
import Card from "./card.js";
import Payment from "./payment.js";

User.hasMany(Address, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Address.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Demand, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Demand.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Card, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Card.belongsTo(User, { foreignKey: "userId" });

Dish.hasMany(Item, {
  foreignKey: "dishId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Item.belongsTo(Dish, { foreignKey: "dishId" });

Demand.hasMany(Item, {
  foreignKey: "demandId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Item.belongsTo(Demand, { foreignKey: "demandId" });

Demand.hasOne(Payment, {
  foreignKey: "demandId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Payment.belongsTo(Demand, { foreignKey: "demandId" });

Card.hasMany(Payment, {
  foreignKey: "cardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Payment.belongsTo(Card, { foreignKey: "cardId" });

export { User, Address, Demand, Item, Dish, Card, Payment, sequelize };
