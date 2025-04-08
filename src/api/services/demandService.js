import {
  create as _create,
  findById as _findById,
  remove as _remove,
  findAll as _findAll,
  findByUser as _findByUser,
} from "../repositories/demandRepository.js";

export const create = async (demand) => {
  return await _create(demand);
};

export const remove = async (id) => {
  await _remove(id);
};

export const findAll = async () => {
  const demands = await _findAll();
  return demands;
};

export const findByUser = async (userId) => {
  const demands = await _findByUser(userId);
  return demands;
};

export const findById = async (id) => {
  const demand = await _findById(id);
  return demand;
};
