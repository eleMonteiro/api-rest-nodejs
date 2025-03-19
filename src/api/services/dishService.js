import {
  create as _create,
  remove as _remove,
  update as _update,
  findAll as _findAll,
  findById as _findById,
} from "../repositories/dish/dishRepository.js";
import { createValidationError } from "../../utils/erros.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const create = async (dish) => {
  if (isEmptyObject(dish)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  return await _create(dish);
};

export const remove = async (id) => {
  await _remove(id);
};

export const update = async (id, dish) => {
  if (isEmptyObject(dish)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  await _update(id, dish);
};

export const findAll = async () => {
  const dishes = await _findAll();
  return dishes ? dishes : [];
};

export const findById = async (id) => {
  const dish = await _findById(id);
  return dish ? dish : [];
};
