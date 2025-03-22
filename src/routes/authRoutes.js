import { Router } from "express";
import { login, logout } from "../api/controllers/loginController.js";

const authRoutes = Router();

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Autentica um usuário
 *     description: Realiza login e retorna um token de autenticação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
 */
authRoutes.post("/", login);

/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Desloga um usuário
 *     description: Invalida o token de autenticação do usuário.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deslogado com sucesso
 *       401:
 *         description: Token inválido
 */
authRoutes.post("/logout", logout);

export default authRoutes;
