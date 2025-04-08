import { Router } from "express";
import { validateAddress } from "../validators/addressValidator.js";
import {
  create,
  update,
  remove,
  findById,
  findByUserId,
} from "../api/controllers/addressController.js";

const addressRoutes = Router();

/**
 * @swagger
 * /api/v1/addresses:
 *   post:
 *     tags: 
 *       - Endereços
 *     summary: Criar um novo endereço
 *     description: Cria um novo endereço no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 *       400:
 *         description: Erro de validação
 */
addressRoutes.post("/", validateAddress, create);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   put:
 *     tags: 
 *       - Endereços
 *     summary: Atualizar um endereço
 *     description: Atualiza um endereço existente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Endereço não encontrado
 */
addressRoutes.put("/:id", validateAddress, update);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   delete:
 *     tags: 
 *       - Endereços
 *     summary: Excluir um endereço
 *     description: Remove um endereço existente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Endereço excluído com sucesso
 *       404:
 *         description: Endereço não encontrado
 */
addressRoutes.delete("/:id", remove);

/**
 * @swagger
 * /api/v1/addresses/user:
 *   get:
 *     tags: 
 *       - Endereços
 *     summary: Listar endereços de um usuário
 *     description: Retorna todos os endereços cadastrados para um usuário específico
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de endereços encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */
addressRoutes.get("/user", findByUserId);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   get:
 *     tags: 
 *       - Endereços
 *     summary: Buscar endereço por ID
 *     description: Retorna os dados de um endereço com base no ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Endereço não encontrado
 */
addressRoutes.get("/:id", findById);

export default addressRoutes;
