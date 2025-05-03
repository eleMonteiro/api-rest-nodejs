import { Router } from "express";
import {
  findAll,
  findById,
  findByUser,
  create,
  remove,
} from "../api/controllers/demandController.js";
import { validateDemand } from "../validators/demandValidator.js";

const demandRoutes = new Router();

/**
 * @swagger
 * /api/v1/demands/user:
 *  get:
 *    tags:
 *      - Demandas
 *    summary: Retorna todas as demandas de um usuário
 *    description: Retorna uma lista de todas as demandas cadastradas de um usuário.
 *    parameters:
 *       - in: query
 *         name: user
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *    responses:
 *      200:
 *        description: Lista de demandas retornada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Demand"
 */
demandRoutes.get("/user", findByUser);

/**
 * @swagger
 * /api/v1/demands:
 *  get:
 *    tags:
 *      - Demandas
 *    summary: Retorna todas as demandas
 *    description: Retorna uma lista de todas as demandas cadastradas.
 *    responses:
 *      200:
 *        description: Lista de demandas retornada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Demand"
 */
demandRoutes.get("/", findAll);

/**
 * @swagger
 * /api/v1/demands/{id}:
 *  get:
 *    tags:
 *      - Demandas
 *    summary: Retorna uma demanda pelo ID
 *    description: Retorna uma demanda cadastrada com base no ID informado.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID da demanda
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Demanda retornada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Demand"
 *      404:
 *        description: Demanda não encontrada
 */
demandRoutes.get("/:id", findById);

/**
 * @swagger
 * /api/v1/demands:
 *  post:
 *    tags:
 *      - Demandas
 *    summary: Cria uma demanda
 *    description: Cria uma nova demanda.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Demand"
 *    responses:
 *      201:
 *        description: Demanda criada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Demand"
 */
demandRoutes.post("/", validateDemand, create);

/**
 * @swagger
 * /api/v1/demands/{id}:
 *  delete:
 *    tags:
 *      - Demandas
 *    summary: Remove uma demanda pelo ID
 *    description: Remove uma demanda cadastrada com base no ID informado.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID da demanda
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: Demanda removida com sucesso
 */
demandRoutes.delete("/:id", remove);

export default demandRoutes;
