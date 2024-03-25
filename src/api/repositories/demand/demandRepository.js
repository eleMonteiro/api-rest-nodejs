const Demand = require("../../models/demand");
const itemRepository = require("../item/itemRepository");
const userRepository = require("../user/userRepository");
const dishRepository = require("../dish/dishRepository");

const findAll = async () => {
  const demands = await Demand.findAll({ include: ["itens"] });
  return demands;
};

const findByUser = async (userId) => {
  const demands = await Demand.findOne({ where: { userId: userId } });
  return demands;
};

const findById = async (id) => {
  const demand = await Demand.findByPk(id);
  return demand;
};

const addItem = async (itens, demand) => {
  itens.forEach(async (element) => {
    const item = await itemRepository.create(element);
    await demand.addItens(item);

    const dish = await dishRepository.findById(element.dish.id);
    await dish.addItens(item);
  });
};

const addClient = async (userId, demand) => {
  const user = await userRepository.findById(userId);
  await user.addDemands(demand);
};

const create = async (demand) => {
  const { itens, ..._demand } = demand;
  const _demand_ = await Demand.create(_demand);
  await addClient(demand.user.id, _demand_);
  await addItem(itens, _demand_);
  return _demand_;
};

const remove = async (id) => {
  const demand = await findById(id);
  await demand.destroy();
};

module.exports = {
  create,
  remove,
  findAll,
  findByUser,
  findById,
};
