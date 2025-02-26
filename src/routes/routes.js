const { Router } = require("express");
const acl = require("express-acl");
const userController = require("../api/controllers/userController");
const dishController = require("../api/controllers/dishController");
const demandController = require("../api/controllers/demandController");
const loginController = require("../api/controllers/loginController");

const verifyToken = require("../middlewares/auth");

const routes = new Router();

// Initial API route, returns a greeting message
routes.get("/api/v1/", (_req, res) => {
  return res.json({ message: "Hello from API" });
});

// Login route (no authentication required)
routes.post("/api/v1/login", loginController.login);

// Middleware for token authentication and authorization
routes.use(verifyToken);  // Verifies the authentication token
routes.use(acl.authorize);  // Verifies the user's permissions

// Routes for Users
routes.get("/api/v1/users", userController.findAll); 
routes.get("/api/v1/users/cpf", userController.findByCPF);
routes.get("/api/v1/users/:id", userController.findById);
routes.post("/api/v1/users", userController.create);
routes.delete("/api/v1/users/:id", userController.remove);
routes.put("/api/v1/users/:id", userController.update);

// Routes for Dishes
routes.get("/api/v1/dishes", dishController.findAll);
routes.get("/api/v1/dishes/:id", dishController.findById);
routes.post("/api/v1/dishes", dishController.create);
routes.delete("/api/v1/dishes/:id", dishController.remove);
routes.put("/api/v1/dishes/:id", dishController.update);

// Routes for Demands
routes.get("/api/v1/demands", demandController.findAll);
routes.get("/api/v1/demands/:id", demandController.findById);
routes.get("/api/v1/demands/user", demandController.findByUser);
routes.post("/api/v1/demands", demandController.create);
routes.delete("/api/v1/demands/:id", demandController.remove);

module.exports = routes;
