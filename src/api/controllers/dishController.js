import dotenv from "dotenv";
import asyncHandler from "../../middlewares/asyncHandler.js";
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
  findAll as _findAll,
  findById as _findById,
} from "../services/dishService.js";
import { logger } from "../../config/logger.js";
import { validateDish } from "../../validators/dishValidator.js";

dotenv.config();

const getImagePath = (req, existingDish) => {
  if (req.file) {
    logger.info(`Uploaded dish image: ${req.file.filename}`);
    return `${process.env.BASE_URL}${process.env.UPLOADS_FOLDER}${req.file.filename}`;
  }
  return existingDish?.image || null;
};

export const create = [
  validateDish,
  asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;
    const imageUrl = getImagePath(req, null);

    const dish = await _create({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });

    logger.info(`Dish created: ${dish.id}`);
    return createdResponse(res, dish, "Dish created successfully");
  }),
];

export const update = [
  validateDish,
  asyncHandler(async (req, res) => {
    const { id, name, description, price, category } = req.body;
    const existingDish = await _findById(req.params.id);

    if (!existingDish) {
      return notFoundResponse(res, "Dish");
    }

    const imageUrl = getImagePath(req, existingDish);
    await _update(req.params.id, {
      id,
      name,
      description,
      price,
      category,
      image: imageUrl,
    });

    logger.info(`Dish updated: ${req.params.id}`);
    return successResponse(res, null, 200, "Dish updated successfully");
  }),
];

export const remove = asyncHandler(async (req, res) => {
  const dish = await _findById(req.params.id);

  if (!dish) {
    return notFoundResponse(res, "Dish");
  }

  await _remove(req.params.id);
  logger.info(`Dish deleted: ${req.params.id}`);
  return noContentResponse(res);
});

export const findAll = asyncHandler(async (_req, res) => {
  const dishes = await _findAll();
  return successResponse(res, dishes);
});

export const findById = asyncHandler(async (req, res) => {
  const dish = await _findById(req.params.id);
  if (!dish) {
    return notFoundResponse(res, "Dish");
  }
  return successResponse(res, dish, 200, "Dish fetched successfully");
});
