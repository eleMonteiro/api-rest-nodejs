import {
  create as _create,
  remove as _remove,
  findAll as _findAll,
  findByDemand as _findByDemand,
  findById as _findById,
} from "../services/itemService.js";
import { logger } from "../../config/logger.js";
import {
  successResponse,
  noContentResponse,
  notFoundResponse,
} from "../../helpers/apiResponse.js";
import { validateItem } from "../../validators/itemValidator.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

export const create = [
  validateItem,
  asyncHandler(async (req, res) => {
    const item = await _create(req.body);
    logger.info("Item created successfully", item);
    return successResponse(res, item, 201, "Item created successfully");
  }),
];

export const remove = asyncHandler(async (req, res) => {
  const item = await _findById(req.params.id);
  if (!item) {
    return notFoundResponse(res, "Item");
  }
  await _remove(req.params.id);
  logger.info("Item deleted successfully", item);
  return noContentResponse(res, "Item deleted successfully");
});

export const findAll = asyncHandler(async (_req, res) => {
  const items = await _findAll();
  return successResponse(res, items, 200, "Items fetched successfully");
});

export const findByDemand = asyncHandler(async (req, res) => {
  const items = await _findByDemand(req.query.demandId);
  if (!items || items.length === 0) {
    return notFoundResponse(res, "Items");
  }
  logger.info("Items fetched successfully", items);
  return successResponse(res, items, 200, "Items fetched successfully");
});

export const findById = asyncHandler(async (req, res) => {
  const item = await _findById(req.params.id);
  if (!item) {
    return notFoundResponse(res, "Item");
  }
  return successResponse(res, item, 200, "Item fetched successfully");
});
