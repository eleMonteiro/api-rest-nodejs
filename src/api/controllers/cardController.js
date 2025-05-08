import asyncHandler from "../../middlewares/asyncHandler.js";
import { logger } from "../../config/logger.js";
import {
  validateCard,
  validateFilter,
} from "../../validators/cardValidator.js";
import {
  successResponse,
  notFoundResponse,
  createdResponse,
  noContentResponse,
} from "../../helpers/apiResponse.js";
import {
  create as _create,
  remove as _remove,
  update as _update,
  findById as _findById,
  findByFilter as _findByFilter,
} from "../services/cardService.js";

export const create = [
  validateCard,
  asyncHandler(async (req, res) => {
    const card = req.body;

    const exists = await _findByFilter({ cardNumber: card.cardNumber });
    if (exists && exists.length > 0) {
      return existsEntityResponse(res, "Card with this number already exists");
    }

    const _card = await _create(card);
    logger.info(`Card created: ${_card.id}`);
    return createdResponse(res, _card, "Card created successfully");
  }),
];

export const remove = asyncHandler(async (req, res) => {
  const card = await _findById(req.params.id);

  if (!card) {
    return notFoundResponse(res, "card");
  }

  await _remove(req.params.id);
  logger.info(`Card removed: ${card.id}`);
  return noContentResponse(res);
});

export const update = [
  validateCard,
  asyncHandler(async (req, res) => {
    const existingCard = await _findById(req.params.id);

    if (!existingCard) {
      return notFoundResponse(res, "card");
    }

    const card = req.body;
    const updatedCard = await _update(req.params.id, card);
    logger.info(`Card updated: ${updatedCard.id}`);
    return successResponse(res, updatedCard, "Card updated successfully");
  }),
];

export const findById = asyncHandler(async (req, res) => {
  const card = await _findById(req.params.id);

  if (!card) {
    return notFoundResponse(res, "card");
  }

  return successResponse(res, card, "Card retrieved successfully");
});

export const findByFilter = [
  validateFilter,
  asyncHandler(async (req, res) => {
    const { filter } = req.body;
    const cards = await _findByFilter(filter);

    if (!cards || cards.length === 0) {
      return notFoundResponse(res, "cards");
    }
    return successResponse(res, cards, 200, "Cards retrieved successfully");
  }),
];
