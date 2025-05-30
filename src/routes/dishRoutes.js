import { Router } from "express";
import { upload, resizeImage } from "../middlewares/upload.js";
import { validateDish } from "../validators/dishValidator.js";
import {
  findAll,
  findById,
  create,
  remove,
  update,
} from "../api/controllers/dishController.js";

const dishRoutes = Router();

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
 *    description: Cria um novo prato com imagem.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: "#/components/schemas/Dish"
 *    responses:
 *      201:
 *        description: Prato criado com sucesso
 *      400:
 *        description: Dados inválidos
 *      422:
 *        description: Validação falhou
 */
dishRoutes.post("/", upload.single("image"), resizeImage, validateDish, create);

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
 *             $ref: "#/components/schemas/Dish"
 *    responses:
 *      200:
 *        description: Prato atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Dish"
 *      400:
 *        description: Dados inválidos
 *      404:
 *        description: Prato não encontrado
 *      422:
 *        description: Validação falhou
 */
dishRoutes.put("/:id", upload.single("image"), validateDish, update);

export default dishRoutes;
