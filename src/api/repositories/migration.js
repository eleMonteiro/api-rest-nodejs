(async () => {
  const sequelize = require("./db");
  require("@models/user");
  require("@models/dish");

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (error) {
    /* empty */
  }
})();
