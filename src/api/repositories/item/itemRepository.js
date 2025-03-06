import { findAll as _findAll, findOne, findByPk, create as _create } from "@models/item";

const findAll = async () => {
  const itens = await _findAll({ include: ["dishes"] });
  return itens;
};

const findByDemand = async (demandId) => {
  const item = await findOne({ where: { demandId: demandId } });
  return item;
};

const findById = async (id) => {
  const item = await findByPk(id);
  return item;
};

const create = async (item) => {
  const _item = await _create(item);
  return _item;
};

const remove = async (id) => {
  const item = await findById(id);
  await item.destroy();
};

export default {
  create,
  remove,
  findAll,
  findByDemand,
  findById,
};
