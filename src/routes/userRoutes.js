import { Router } from "express";
import { validateUser } from "../validators/userValidator.js";
import {
  findAll,
  findByCPF,
  findById,
  create,
  remove,
  update,
} from "../api/controllers/userController.js";

import {
  remove as _remove,
  update as _update,
} from "../api/controllers/addressController.js";

const userRoutes = Router();

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
 * /api/v1/users/cpf:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna um usuário pelo CPF
 *     description: Retorna um usuário cadastrado com base no CPF informado.
 *     parameters:
 *       - in: query
 *         name: cpf
 *         required: true
 *         description: CPF do usuário
 *         schema:
 *           type: string
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
userRoutes.get("/cpf", findByCPF);

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

/**
 * @swagger
 * /api/v1/users/address/{addressId}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Remove o endereço de um usuário
 *     description: Remove o endereço de um usuário cadastrado com base no ID informado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço que desejo remover
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Endereço removido com sucesso
 *       404:
 *         description: Endereço não encontrado
 */
userRoutes.delete("/address/:id", _remove);

/**
 * @swagger
 * /api/v1/users/address/{addressId}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza o endereço de um usuário
 *     description: Atualiza o endereço de um usuário cadastrado com base no ID informado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço que desejo atualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Address"
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Address"
 *       404:
 *         description: Endereço não encontrado
 */
userRoutes.put("/address/:id", _update);

export default userRoutes;
