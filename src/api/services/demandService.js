import {
  create as _create,
  findById as _findById,
  remove as _remove,
  findAll as _findAll,
  findByUser as _findByUser,
} from "../repositories/demand/demandRepository.js";
import { validPriceDemand } from "../../utils/validatorDemand.js";
import { createValidationError } from "../../utils/erros.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const checkObjectExistence = (object, errorKey) => {
  if (!object || object.length === 0) {
    throw createValidationError(errorKey);
  }
};

export const create = async (demand) => {
  if (validPriceDemand(demand)) {
    throw createValidationError("PRICE_DEMAND_INCORRECT");
  }

  if (isEmptyObject(demand)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }

  return await _create(demand);
};

export const remove = async (id) => {
  const demand = await _findById(id);
  checkObjectExistence(demand, "OBJECT_NOT_FOUND");
  await _remove(id);
};

export const findAll = async () => {
  const demands = await _findAll();
  checkObjectExistence(demands, "OBJECT_NOT_FOUND");
  return demands;
};

export const findByUser = async (userId) => {
  const demands = await _findByUser(userId);
  checkObjectExistence(demands, "OBJECT_NOT_FOUND");
  return demands;
};

export const findById = async (id) => {
  const demand = await _findById(id);
  checkObjectExistence(demand, "OBJECT_NOT_FOUND");
  return demand;
};
