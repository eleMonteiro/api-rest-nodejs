import { Router } from "express";
import {
  findAll,
  findById,
  create,
  remove,
  update,
} from "../api/controllers/dishController.js";

const dishRoutes = new Router();

/**
 * @swagger
 * /api/v1/dishes:
 *  get:
 *    tags:
 *      - Pratos
 *    summary: Retorna todos os pratos
 *    description: Retorna uma lista de todos os pratos cadastrados.
 *    responses:
 *      200:
 *        description: Lista de pratos retornada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Dish"
 */
dishRoutes.get("/", findAll);

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *  get:
 *    tags:
 *      - Pratos
 *    summary: Retorna um prato pelo ID
 *    description: Retorna um prato cadastrado com base no ID informado.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do prato
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Prato retornado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Dish"
 *      404:
 *        description: Prato não encontrado
 */
dishRoutes.get("/:id", findById);

/**
 * @swagger
 * /api/v1/dishes:
 *  post:
 *    tags:
 *      - Pratos
 *    summary: Cria um prato
 *    description: Cria um novo prato.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Dish"
 *    responses:
 *      201:
 *        description: Prato criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Dish"
 *      400:
 *        description: Requisição inválida
 */
dishRoutes.post("/", create);

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *  delete:
 *    tags:
 *      - Pratos
 *    summary: Remove um prato
 *    description: Remove um prato cadastrado com base no ID informado.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do prato
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: Prato removido com sucesso
 *      404:
 *        description: Prato não encontrado
 */
dishRoutes.delete("/:id", remove);

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *  put:
 *    tags:
 *      - Pratos
 *    summary: Atualiza um prato
 *    description: Atualiza um prato cadastrado com base no ID informado.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do prato
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Dish"
 *    responses:
 *      200:
 *        description: Prato atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Dish"
 *      404:
 *        description: Prato não encontrado
 */
dishRoutes.put("/:id", update);

export default dishRoutes;
