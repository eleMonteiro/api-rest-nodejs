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
 *     summary: Create a new address
 *     tags: [Endereços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created
 *       400:
 *         description: Validation error
 */
addressRoutes.post("/", validateAddress, create);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   put:
 *     summary: Update an address
 *     tags: [Endereços]
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
 *         description: Address updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
addressRoutes.put("/:id", validateAddress, update);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
addressRoutes.delete("/:id", remove);

/**
 * @swagger
 * /api/v1/addresses/user:
 *   get:
 *     summary: Get addresses by user
 *     tags: [Endereços]
 *     responses:
 *       200:
 *         description: List of addresses
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
 *     summary: Get address by ID
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Not found
 */
addressRoutes.get("/:id", findById);

export default addressRoutes;
