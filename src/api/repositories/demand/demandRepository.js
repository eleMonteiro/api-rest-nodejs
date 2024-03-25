const Demand = require("../../models/demand");
const itemRepository = require("../item/itemRepository");

const findAll = async () => {
  const demands = await Demand.findAll();
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
  itens.array.forEach(async (element) => {
    const item = await itemRepository.create(element);
    await demand.addItem(item);
  });
};

const create = async (demand) => {
  const { itens, ..._demand } = demand;
  const _demand_ = await Demand.create(_demand);
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
