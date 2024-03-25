const { Router } = require("express");
const acl = require("express-acl");
const userController = require("../api/controllers/userController");
const dishController = require("../api/controllers/dishController");
const demandController = require("../api/controllers/demandController");
const loginController = require("../api/controllers/loginController");

const verifyToken = require("../middlewares/auth");

const routes = new Router();

routes.get("/", (_req, res) => {
  return res.json({ message: "Hello from API" });
});

routes.post("/login", loginController.login);

routes.use(verifyToken);
routes.use(acl.authorize);

routes.get("/users", userController.findAll);
routes.get("/users/:id", userController.findById);
routes.get("/users", userController.findByCPF);
routes.post("/users", userController.create);
routes.delete("/users/:id", userController.remove);
routes.put("/users/:id", userController.update);

routes.get("/dishes/", dishController.findAll);
routes.get("/dishes/:id", dishController.findById);
routes.post("/dishes", dishController.create);
routes.delete("/dishes/:id", dishController.remove);
routes.put("/dishes/:id", dishController.update);

routes.get("/demands", demandController.findAll);
routes.get("/demands/:id", demandController.findById);
routes.get("/demands", demandController.findByUser);
routes.post("/demands", demandController.create);
routes.delete("/demands/:id", demandController.remove);

module.exports = routes;
