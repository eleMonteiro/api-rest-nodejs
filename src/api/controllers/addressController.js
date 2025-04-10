import {
  remove as _remove,
  update as _update,
  create as _create,
  findById as _findById,
  findByFilter as _findByFilter,
} from "../services/addressService.js";
import {
  validateAddress,
  validateFilter,
} from "../../validators/addressValidator.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { logger } from "../../config/logger.js";
import {
  successResponse,
  notFoundResponse,
  noContentResponse,
} from "../../helpers/apiResponse.js";

export const create = [
  validateAddress,
  asyncHandler(async (req, res) => {
    const address = await _create(req.body);
    logger.info(`Address created: ${address.id}`);
    return successResponse(res, address, 201, "Address created successfully");
  }),
];

export const remove = asyncHandler(async (req, res) => {
  const address = await _findById(req.params.id);
  if (!address) {
    return notFoundResponse(res, "Address");
  }
  await _remove(req.params.id);
  logger.info(`Address removed: ${req.params.id}`);
  return noContentResponse(res, "Address removed successfully");
});

export const update = [
  validateAddress,
  asyncHandler(async (req, res) => {
    const address = await _findById(req.params.id);
    if (!address) {
      return notFoundResponse(res, "Address");
    }
    await _update(req.params.id, req.body);
    logger.info(`Address updated: ${req.params.id}`);
    return successResponse(res, null, 200, "Address updated successfully");
  }),
];

export const findByFilter = [
  validateFilter,
  asyncHandler(async (req, res) => {
    const addresses = await _findByFilter(req.body.filter);
    if (!addresses) {
      return notFoundResponse(res, "Addresses");
    }
    return successResponse(res, addresses, 200, "Addresses found successfully");
  }),
];

export const findById = asyncHandler(async (req, res) => {
  const address = await _findById(req.params.id);
  if (!address) {
    return notFoundResponse(res, "Address");
  }
  return successResponse(res, address, 200, "Address found successfully");
});
