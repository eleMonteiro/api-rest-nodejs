import {
  create as _create,
  remove as _remove,
  findAll as _findAll,
  findByUser as _findByUser,
  findById as _findById,
} from "../services/demandService.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { logger } from "../../config/logger.js";
import { validateDemand } from "../../validators/demandValidator.js";
import {
  successResponse,
  notFoundResponse,
  noContentResponse,
} from "../../helpers/apiResponse.js";

export const create = [
  validateDemand,
  asyncHandler(async (req, res) => {
    const demand = await _create(req.body);
    logger.info(`Demand created: ${demand.id}`);
    return successResponse(res, demand, 201, "Demand created successfully");
  }),
];

export const remove = asyncHandler(async (req, res) => {
  const demand = await _findById(req.params.id);
  if (!demand) {
    return notFoundResponse(res, "Demand");
  }
  await _remove(req.params.id);
  logger.info(`Demand removed: ${req.params.id}`);
  return noContentResponse(res, "Demand removed successfully");
});

export const findAll = asyncHandler(async (_req, res) => {
  const demands = await _findAll();
  return successResponse(res, demands);
});

export const findByUser = asyncHandler(async (req, res) => {
  const demands = await _findByUser(req.query.userId);
  if (!demands) {
    return notFoundResponse(res, "Demands");
  }
  return successResponse(res, demands, 200, "Demands fetched successfully");
});

export const findById = asyncHandler(async (req, res) => {
  const demand = await _findById(req.params.id);
  if (!demand) {
    return notFoundResponse(res, "Demand");
  }
  return successResponse(res, demand, 200, "Demand fetched successfully");
});
