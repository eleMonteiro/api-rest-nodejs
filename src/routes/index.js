import { Router } from "express";
import userRoutes from "./userRoutes.js";
import dishRoutes from "./dishRoutes.js";
import demandRoutes from "./demandRoutes.js";
import loginRoutes from "./authRoutes.js";
import itemRoutes from "./itemRoutes.js";
import addressRoutes from "./addressRoutes.js";
import cardRoutes from "./cardRoutes.js";
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
 *    - name: Endereços
 *      description: Endpoints relacionados à gestão de endereços
 *    - name: Cartões
 *      description: Endpoints relacionadas à gestão de cartões
 */

routes.use("/api/v1/", loginRoutes);

routes.use("/api/v1/users", verifyToken, authorize, userRoutes);
routes.use("/api/v1/dishes", verifyToken, authorize, dishRoutes);
routes.use("/api/v1/demands", verifyToken, authorize, demandRoutes);
routes.use("/api/v1/items", verifyToken, authorize, itemRoutes);
routes.use("/api/v1/addresses", verifyToken, authorize, addressRoutes);
routes.use("/api/v1/cards", verifyToken, authorize, cardRoutes);

export default routes;
