import {
  create as _create,
  remove as _remove,
  findAll as _findAll,
  findByDemand as _findByDemand,
  findById as _findById,
} from "../repositories/item/itemRepository.js";
import { createValidationError } from "../../utils/responses.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const create = async (item) => {
  if (isEmptyObject(item)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  return await _create(item);
};

export const remove = async (id) => {
  await _remove(id);
};

export const findAll = async () => {
  const itens = await _findAll();
  return itens ? itens : [];
};

export const findByDemand = async (demandId) => {
  const itens = _findByDemand(demandId);
  return itens ? itens : [];
};

export const findById = async (id) => {
  const item = await _findById(id);
  return item ? item : [];
};
