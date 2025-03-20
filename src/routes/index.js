import { Router } from "express";
import userRoutes from "./userRoutes.js";
import dishRoutes from "./dishRoutes.js";
import demandRoutes from "./demandRoutes.js";
import loginRoutes from "./authRoutes.js";
import itemRoutes from "./itemRoutes.js";
import { verifyToken } from "../middlewares/auth.js";
import { authorize } from "express-acl";

const routes = Router();
/**
 * @swagger
 * tags:
 *    - name: Autenticação
 *      description: Endpoints relacionados à autenticação de usuários
 *    - name: Usuários
 *      description: Endpoints relacionados à gestão de usuários
 *    - name: Pratos
 *      description: Endpoints relacionados à gestão de pratos
 *    - name: Demandas
 *      description: Endpoints relacionados à gestão de demandas
 *    - name: Itens
 *      description: Endpoints relacionados à gestão de itens
 *
 */

routes.get("/api/v1/", (_req, res) => {
  return res.json({ message: "Hello from API" });
});

routes.use("/api/v1/login", loginRoutes);

routes.use(verifyToken);
routes.use(authorize);

routes.use("/api/v1/users", userRoutes);
routes.use("/api/v1/dishes", dishRoutes);
routes.use("/api/v1/demands", demandRoutes);
routes.use("/api/v1/items", itemRoutes);

export default routes;
