import {
  create as _create,
  remove as _remove,
  update as _update,
  findAll as _findAll,
  findById as _findById,
} from "../repositories/dishRepository.js";

export const create = async (dish) => {
  return await _create(dish);
};

export const remove = async (id) => {
  await _remove(id);
};

export const update = async (id, dish) => {
  await _update(id, dish);
};

export const findAll = async ({ page, pageSize, sort, filter }) => {
  const dishes = await _findAll({ page, pageSize, sort, filter });
  return dishes || [];
};

export const findById = async (id) => {
  const dish = await _findById(id);
  return dish || null;
};
