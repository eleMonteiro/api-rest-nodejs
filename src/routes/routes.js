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

routes.get("/api/v1/", (_req, res) => {
  return res.json({ message: "Hello from API" });
});

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Realiza login e retorna um token de autenticação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Nome de usuário do usuário
 *                 example: "seu_usuario"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "sua_senha"
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJNYWNyb25lIiwiaWF0IjoxNjU4MzY0NjA3fQ.S0t7-R-t77d7aP4g9r9XqI1eW7p6Y-sR3Z-9x_G-Y"
 *       401:
 *         description: Credenciais inválidas
 */
routes.post("/api/v1/login", login);

routes.use(verifyToken);
routes.use(authorize); 

routes.get("/api/v1/users", findAll);
routes.get("/api/v1/users/cpf", findByCPF);
routes.get("/api/v1/users/:id", findById);
routes.post("/api/v1/users", create);
routes.delete("/api/v1/users/:id", remove);
routes.put("/api/v1/users/:id", update);

routes.get("/api/v1/dishes", _findAll);
routes.get("/api/v1/dishes/:id", _findById);
routes.post("/api/v1/dishes", _create);
routes.delete("/api/v1/dishes/:id", _remove);
routes.put("/api/v1/dishes/:id", _update);

routes.get("/api/v1/demands", __findAll);
routes.get("/api/v1/demands/:id", __findById);
routes.get("/api/v1/demands/user", __findByUser);
routes.post("/api/v1/demands", __create);
routes.delete("/api/v1/demands/:id", __remove);

export default routes;
