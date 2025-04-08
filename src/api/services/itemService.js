import {
  create as _create,
  remove as _remove,
  findAll as _findAll,
  findByDemand as _findByDemand,
  findById as _findById,
} from "../repositories/itemRepository.js";

export const create = async (item) => {
  return await _create(item);
};

export const remove = async (id) => {
  await _remove(id);
};

export const findAll = async () => {
  const itens = await _findAll();
  return itens || [];
};

export const findByDemand = async (demandId) => {
  const itens = _findByDemand(demandId);
  return itens || [];
};

export const findById = async (id) => {
  const item = await _findById(id);
  return item || null;
};
