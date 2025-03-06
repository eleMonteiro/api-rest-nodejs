import { create as _create, remove as _remove, findAll as _findAll, findByDemand as _findByDemand, findById as _findById } from "@repositories/item/itemRepository";
import { createValidationError } from "@utils/erros";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const create = async (item) => {
  if (isEmptyObject(item)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  return await _create(item);
};

const remove = async (id) => {
  await _remove(id);
};

const findAll = async () => {
  const itens = await _findAll();
  return itens ? itens : [];
};

const findByDemand = async (demandId) => {
  const itens = _findByDemand(demandId);
  return itens ? itens : [];
};

const findById = async (id) => {
  const item = await _findById(id);
  return item ? item : [];
};

export default {
  create,
  remove,
  findAll,
  findByDemand,
  findById,
};
