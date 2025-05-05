import { Router } from "express";
import { validateCard } from "../validators/cardValidator.js";
import {
  create,
  update,
  remove,
  findById,
  findByFilter,
} from "../api/controllers/cardController.js";

const cardRoutes = Router();

/**
 * @swagger
 * /api/v1/cards/search:
 *   post:
 *     tags:
 *       - Cartões
 *     summary: Busca cartões com base em filtros
 *     description: Retorna um cartão que combina com os campos passados no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 properties:
 *                   cardHolderName:
 *                     type: string
 *                   cardNumber:
 *                     type: string
 *     responses:
 *       200:
 *         description: Cartão retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Card"
 *       404:
 *         description: Cartão não encontrado
 */
cardRoutes.get("/search", findByFilter);

/**
 * @swagger
 * /api/v1/cards/{id}:
 *   get:
 *     tags:
 *       - Cartões
 *     summary: Retorna um cartão pelo ID
 *     description: Retorna um cartão cadastrado com base no ID informado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cartão
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cartão retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Card"
 *       404:
 *         description: Cartão não encontrado
 */
cardRoutes.get("/:id", findById);

/**
 * @swagger
 * /api/v1/cards:
 *   post:
 *     tags:
 *       - Cartões
 *     summary: Cria um novo cartão
 *     description: Cria um novo cartão com base nos dados informados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Card"
 *     responses:
 *       201:
 *         description: Cartão criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Card"
 */
cardRoutes.post("/", validateCard, create);

/**
 * @swagger
 * /api/v1/cards/{id}:
 *   put:
 *     tags:
 *       - Cartões
 *     summary: Atualiza um cartão
 *     description: Atualiza um cartão cadastrado com base no ID informado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cartão
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Card"
 *     responses:
 *       200:
 *         description: Cartão atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Card"
 *       404:
 *         description: Cartão não encontrado
 */
cardRoutes.put("/:id", validateCard, update);

/**
 * @swagger
 * /api/v1/cards/{id}:
 *   delete:
 *     tags:
 *       - Cartões
 *     summary: Remove um cartão
 *     description: Remove um cartão cadastrado com base no ID informado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cartão
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cartão removido com sucesso
 *       404:
 *         description: Cartão não encontrado
 */
cardRoutes.delete("/:id", remove);

export default cardRoutes;
