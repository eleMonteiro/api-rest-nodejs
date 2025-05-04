import dotenv from "dotenv";
import fs from "fs";
import path from "path";
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

export const deleteImageFile = (imageUrl) => {
  if (!imageUrl) return;

  const imagePath = path.join(
    process.cwd(),
    process.env.UPLOADS_FOLDER,
    path.basename(imageUrl)
  );

  fs.unlink(imagePath, (err) => {
    if (err) {
      logger.error(`Error deleting image: ${err.message}`);
    } else {
      logger.info(`Image deleted: ${imagePath}`);
    }
  });
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

    if (req.file && existingDish.image) {
      deleteImageFile(existingDish.image);
    }

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

  if (dish.image) {
    deleteImageFile(dish.image);
  }

  await _remove(req.params.id);
  logger.info(`Dish deleted: ${req.params.id}`);
  return noContentResponse(res);
});

export const findAll = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const dishes = await _findAll({ page, pageSize });
  return successResponse(res, dishes);
});

export const findById = asyncHandler(async (req, res) => {
  const dish = await _findById(req.params.id);
  if (!dish) {
    return notFoundResponse(res, "Dish");
  }
  return successResponse(res, dish, 200, "Dish fetched successfully");
});
