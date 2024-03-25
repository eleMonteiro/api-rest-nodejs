const demandRepository = require("../repositories/demand/demandRepository");
const { OBJECT_UNDEFINED } = require("../../utils/messagesErro");

const create = async (demand) => {
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
