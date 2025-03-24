(async () => {
  const sequelize = require("./db");
  require("../../models/user.js");
  require("../../models/dish.js");

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (error) {
    throw new Error("Error connecting to the database");
  }
})();
