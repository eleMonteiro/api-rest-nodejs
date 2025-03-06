import { create as _create, findById as _findById, remove as _remove, findAll as _findAll, findByUser as _findByUser } from "@repositories/demand/demandRepository";
import { validPriceDemand } from "@utils/validatorDemand";
import { createValidationError } from "@utils/erros";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const checkObjectExistence = (object, errorKey) => {
  if (!object || object.length === 0) {
    throw createValidationError(errorKey);
  }
};

const create = async (demand) => {
  if (validPriceDemand(demand)) {
    throw createValidationError("PRICE_DEMAND_INCORRECT");
  }

  if (isEmptyObject(demand)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }

  return await _create(demand);
};

const remove = async (id) => {
  const demand = await _findById(id);
  checkObjectExistence(demand, "OBJECT_NOT_FOUND");
  await _remove(id);
};

const findAll = async () => {
  const demands = await _findAll();
  checkObjectExistence(demands, "OBJECT_NOT_FOUND");
  return demands;
};

const findByUser = async (userId) => {
  const demands = await _findByUser(userId);
  checkObjectExistence(demands, "OBJECT_NOT_FOUND");
  return demands;
};

const findById = async (id) => {
  const demand = await _findById(id);
  checkObjectExistence(demand, "OBJECT_NOT_FOUND");
  return demand;
};

export default {
  create,
  remove,
  findAll,
  findByUser,
  findById,
};
