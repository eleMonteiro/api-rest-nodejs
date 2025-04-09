import asyncHandler from "../../middlewares/asyncHandler.js";
import {
  successResponse,
  notFoundResponse,
  createdResponse,
  noContentResponse,
  existsEntityResponse,
} from "../../helpers/apiResponse.js";
import {
  create as _create,
  remove as _remove,
  update as _update,
  findAll as _findAll,
  findById as _findById,
  findByFilter as _findByFilter,
  register as _register,
  findByEmailOrCPF as _findByEmailOrCPF,
} from "../services/userService.js";
import { logger } from "../../config/logger.js";
import {
  validateUser,
  validateUserRegister,
  validateFilter,
} from "../../validators/userValidator.js";

export const create = [
  validateUser,
  asyncHandler(async (req, res) => {
    const user = req.body;
    const exists = await _findByEmailOrCPF(user);
    if (exists) {
      return existsEntityResponse(
        res,
        "User with this email or CPF already exists"
      );
    }

    const _user = await _create(user);
    logger.info(`User created: ${_user.id}`);

    return createdResponse(res, _user, "User created successfully");
  }),
];

export const remove = asyncHandler(async (req, res) => {
  const user = await _findById(req.params.id);

  if (!user) {
    return notFoundResponse(res, "user");
  }

  await _remove(req.params.id);
  logger.info(`User removed: ${user.id}`);
  return noContentResponse(res);
});

export const update = [
  validateUser,
  asyncHandler(async (req, res) => {
    const existingUser = await _findById(req.params.id);

    if (!existingUser) {
      return notFoundResponse(res, "user");
    }

    const user = req.body;
    const exists = await _findByEmailOrCPF(user);
    if (exists && exists.id !== existingUser.id) {
      return existsEntityResponse(
        res,
        "User with this email or CPF already exists"
      );
    }

    const id = req.params.id;
    await _update(id, user);
    logger.info(`User updated: ${id}`);
    return successResponse(res, null, 200, "User updated successfully");
  }),
];

export const findAll = asyncHandler(async (_req, res) => {
  const users = await _findAll();
  return successResponse(res, users);
});

export const findById = asyncHandler(async (req, res) => {
  const user = await _findById(req.params.id);
  if (!user) {
    return notFoundResponse(res, "User");
  }

  return successResponse(res, user, 200, "User fetched successfully");
});

export const findByFilter = [
  validateFilter,
  asyncHandler(async (req, res) => {
    const user = await _findByFilter(req.body.filter);
    if (!user) {
      return notFoundResponse(res, "User not found by CPF");
    }

    return successResponse(res, user, 200, "User fetched successfully");
  }),
];

export const register = [
  validateUserRegister,
  asyncHandler(async (req, res) => {
    const user = req.body;
    const existingUser = await _findByEmailOrCPF(user);
    if (existingUser) {
      return existsEntityResponse(
        res,
        "User with this email or CPF already exists"
      );
    }
    const _user = await _register(user);
    logger.info(`User registered: ${_user.id}`);
    return createdResponse(res, _user, "User registered successfully");
  }),
];
