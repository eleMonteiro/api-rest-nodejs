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

routes.post("/api/v1/login", loginController.login);

routes.use(verifyToken);
routes.use(acl.authorize);

routes.get("/api/v1/users", userController.findAll);
routes.get("/api/v1/users/:id", userController.findById);
routes.get("/api/v1/users", userController.findByCPF);
routes.post("/api/v1/users", userController.create);
routes.delete("/api/v1/users/:id", userController.remove);
routes.put("/api/v1/users/:id", userController.update);

routes.get("/api/v1/dishes/", dishController.findAll);
routes.get("/api/v1/dishes/:id", dishController.findById);
routes.post("/api/v1/dishes", dishController.create);
routes.delete("/api/v1/dishes/:id", dishController.remove);
routes.put("/api/v1/dishes/:id", dishController.update);

routes.get("/api/v1/demands", demandController.findAll);
routes.get("/api/v1/demands/:id", demandController.findById);
routes.get("/api/v1/demands", demandController.findByUser);
routes.post("/api/v1/demands", demandController.create);
routes.delete("/api/v1/demands/:id", demandController.remove);

module.exports = routes;
