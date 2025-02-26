const demandRepository = require("@repositories/demand/demandRepository");
const validatorDemand = require("@utils/validatorDemand");
const { createValidationError } = require("@utils/erros");

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const checkObjectExistence = (object, errorKey) => {
  if (!object || object.length === 0) {
    throw createValidationError(errorKey);
  }
};

const create = async (demand) => {
  if (validatorDemand.validPriceDemand(demand)) {
    throw createValidationError("PRICE_DEMAND_INCORRECT");
  }

  if (isEmptyObject(demand)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }

  return await demandRepository.create(demand);
};

const remove = async (id) => {
  const demand = await demandRepository.findById(id);
  checkObjectExistence(demand, "OBJECT_NOT_FOUND");
  await demandRepository.remove(id);
};

const findAll = async () => {
  const demands = await demandRepository.findAll();
  checkObjectExistence(demands, "OBJECT_NOT_FOUND");
  return demands;
};

const findByUser = async (userId) => {
  const demands = await demandRepository.findByUser(userId);
  checkObjectExistence(demands, "OBJECT_NOT_FOUND");
  return demands;
};

const findById = async (id) => {
  const demand = await demandRepository.findById(id);
  checkObjectExistence(demand, "OBJECT_NOT_FOUND");
  return demand;
};

module.exports = {
  create,
  remove,
  findAll,
  findByUser,
  findById,
};
