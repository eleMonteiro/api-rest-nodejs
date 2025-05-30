import {
  create as _create,
  update as _update,
  findById as _findById,
  remove as _remove,
  findAll as _findAll,
  findByUser as _findByUser,
} from "../repositories/demandRepository.js";

export const create = async (demand) => {
  return await _create(demand);
};

export const update = async (id, demand) => {
  return await _update(id, demand);
};

export const remove = async (id) => {
  await _remove(id);
};

export const findAll = async ({ page, pageSize, sort, filter }) => {
  const demands = await _findAll({ page, pageSize, sort, filter });
  return demands;
};

export const findByUser = async (userId, { page, pageSize }) => {
  const demands = await _findByUser(userId, { page, pageSize });
  return demands;
};

export const findById = async (id) => {
  const demand = await _findById(id);
  return demand;
};
