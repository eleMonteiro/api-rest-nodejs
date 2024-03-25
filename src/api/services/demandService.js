const demandRepository = require("../repositories/demand/demandRepository");
const validatorDemand = require("../../utils/validatorDemand");
const {
  OBJECT_UNDEFINED,
  PRICE_DEMAND_INCORRECT,
} = require("../../utils/messagesErro");

const create = async (demand) => {
  if (validatorDemand.validPriceDemand(demand))
    return { message: "Price: " + PRICE_DEMAND_INCORRECT };
  if (Object.values(demand).length == 0) return { message: OBJECT_UNDEFINED };
  return await demandRepository.create(demand);
};

const remove = async (id) => {
  await demandRepository.remove(id);
};

const findAll = async () => {
  const demands = await demandRepository.findAll();
  return demands ? demands : [];
};

const findByUser = async (userId) => {
  const demands = await demandRepository.findByUser(userId);
  return demands ? demands : [];
};

const findById = async (id) => {
  const demand = await demandRepository.findById(id);
  return demand ? demand : [];
};

module.exports = {
  create,
  remove,
  findAll,
  findByUser,
  findById,
};
