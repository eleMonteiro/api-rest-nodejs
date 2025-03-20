import { Router } from "express";
import {
  create,
  findAll,
  findByDemand,
  findById,
  remove,
} from "../api/controllers/itemController.js";

const itemRoutes = Router();

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     tags:
 *       - Itens
 *     summary: Lista todos os itens
 *     description: Retorna uma lista com todos os itens cadastrados.
 *     responses:
 *       200:
 *         description: Lista de itens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
itemRoutes.get("/api/v1/items", findAll);

/**
 * @swagger
 * /api/v1/items/{id}:
 *   get:
 *     tags:
 *       - Itens
 *     summary: Busca um item
 *     description: Retorna um item específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 */
itemRoutes.get("/api/v1/items/:id", findById);

/**
 * @swagger
 * /api/v1/items:
 *   post:
 *     tags:
 *       - Itens
 *     summary: Cria um item
 *     description: Cria um novo item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Erro de validação
 */
itemRoutes.post("/api/v1/items", create);

/**
 * @swagger
 * /api/v1/items/{demand}:
 *   get:
 *     tags:
 *       - Itens
 *     summary: Lista itens por demanda
 *     description: Retorna uma lista de itens de acordo com a demanda.
 *     parameters:
 *       - in: path
 *         name: demand
 *         required: true
 *         description: Demanda do item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de itens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
itemRoutes.get("/api/v1/items/:demand", findByDemand);

/**
 * @swagger
 * /api/v1/items/{id}:
 *   delete:
 *     tags:
 *       - Itens
 *     summary: Remove um item
 *     description: Remove um item específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item removido
 *       404:
 *         description: Item não encontrado
 */
itemRoutes.delete("/api/v1/items/:id", remove);

export default itemRoutes;
