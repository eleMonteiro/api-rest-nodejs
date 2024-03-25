const Item = require("../../models/item");

const findAll = async () => {
  const itens = await Item.findAll({ include: ["dishes"] });
  return itens;
};

const findByDemand = async (demandId) => {
  const item = await Item.findOne({ where: { demandId: demandId } });
  return item;
};

const findById = async (id) => {
  const item = await Item.findByPk(id);
  return item;
};

const create = async (item) => {
  const _item = await Item.create(item);
  return _item;
};

const remove = async (id) => {
  const item = await findById(id);
  await item.destroy();
};

module.exports = {
  create,
  remove,
  findAll,
  findByDemand,
  findById,
};
