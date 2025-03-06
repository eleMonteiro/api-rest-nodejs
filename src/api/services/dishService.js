import { create as _create, remove as _remove, update as _update, findAll as _findAll, findById as _findById } from "@repositories/dish/dishRepository";
import { createValidationError } from "@utils/erros";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const create = async (dish) => {
  if (isEmptyObject(dish)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  return await _create(dish);
};

const remove = async (id) => {
  await _remove(id);
};

const update = async (id, dish) => {
  if (isEmptyObject(dish)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  await _update(id, dish);
};

const findAll = async () => {
  const dishes = await _findAll();
  return dishes ? dishes : [];
};

const findById = async (id) => {
  const dish = await _findById(id);
  return dish ? dish : [];
};

export default {
  create,
  remove,
  update,
  findAll,
  findById,
};
