import { Router } from "express";
import { authorize } from "express-acl";
import {
  findAll,
  findByCPF,
  findById,
  create,
  remove,
  update,
} from "../api/controllers/userController.js";
import {
  findAll as _findAll,
  findById as _findById,
  create as _create,
  remove as _remove,
  update as _update,
} from "../api/controllers/dishController.js";
import {
  findAll as __findAll,
  findById as __findById,
  findByUser as __findByUser,
  create as __create,
  remove as __remove,
} from "../api/controllers/demandController.js";
import { login } from "../api/controllers/loginController.js";

import { verifyToken } from "../middlewares/auth.js";

const routes = new Router();

// Initial API route, returns a greeting message
routes.get("/api/v1/", (_req, res) => {
  return res.json({ message: "Hello from API" });
});

// Login route (no authentication required)
routes.post("/api/v1/login", login);

// Middleware for token authentication and authorization
routes.use(verifyToken); // Verifies the authentication token
routes.use(authorize); // Verifies the user's permissions

// Routes for Users
routes.get("/api/v1/users", findAll);
routes.get("/api/v1/users/cpf", findByCPF);
routes.get("/api/v1/users/:id", findById);
routes.post("/api/v1/users", create);
routes.delete("/api/v1/users/:id", remove);
routes.put("/api/v1/users/:id", update);

// Routes for Dishes
routes.get("/api/v1/dishes", _findAll);
routes.get("/api/v1/dishes/:id", _findById);
routes.post("/api/v1/dishes", _create);
routes.delete("/api/v1/dishes/:id", _remove);
routes.put("/api/v1/dishes/:id", _update);

// Routes for Demands
routes.get("/api/v1/demands", __findAll);
routes.get("/api/v1/demands/:id", __findById);
routes.get("/api/v1/demands/user", __findByUser);
routes.post("/api/v1/demands", __create);
routes.delete("/api/v1/demands/:id", __remove);

export default routes;
