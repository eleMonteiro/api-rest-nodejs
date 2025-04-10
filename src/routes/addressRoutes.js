import { Router } from "express";
import { validateAddress } from "../validators/addressValidator.js";
import {
  create,
  update,
  remove,
  findById,
  findByFilter,
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
 * /api/v1/addresses/search:
 *   post:
 *     tags:
 *       - Endereços
 *     summary: Listar endereços de um usuário
 *     description: Retorna todos os endereços ativos cadastrados para um usuário específico, com possibilidade de aplicar filtros adicionais.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID do usuário
 *                 example: 1
 *               city:
 *                 type: string
 *                 description: Nome da cidade
 *                 example: "São Paulo"
 *               uf:
 *                 type: string
 *                 description: Unidade federativa (UF)
 *                 example: "SP"
 *               neighborhood:
 *                 type: string
 *                 description: Bairro
 *                 example: "Centro"
 *     responses:
 *       200:
 *         description: Lista de endereços encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Nenhum endereço encontrado
 *       500:
 *         description: Erro interno no servidor
 */
addressRoutes.post("/search", findByFilter);

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
