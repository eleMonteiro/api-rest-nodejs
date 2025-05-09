import { Router } from "express";
import { validateUser, validateFilter } from "../validators/userValidator.js";
import {
  findAll,
  findByFilter,
  findById,
  create,
  remove,
  update,
} from "../api/controllers/userController.js";

const userRoutes = Router();

/**
 * @swagger
 * /api/v1/users/search:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Busca usuário com base em filtros
 *     description: Retorna um usuário que combina com os campos passados no corpo da requisição.
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
 *                   email:
 *                     type: string
 *                   cpf:
 *                     type: string
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.post("/search", validateFilter, findByFilter);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados.
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 */
userRoutes.get("/", findAll);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna um usuário pelo ID
 *     description: Retorna um usuário cadastrado com base no ID informado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.get("/:id", findById);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com base nos dados informados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
userRoutes.post("/", validateUser, create);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Remove um usuário
 *     description: Remove um usuário cadastrado com base no ID informado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.delete("/:id", remove);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário
 *     description: Atualiza um usuário cadastrado com base no ID informado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.put("/:id", validateUser, update);

export default userRoutes;
