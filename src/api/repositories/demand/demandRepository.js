import { findAll as _findAll, findOne, findByPk, create as _create } from "@models/demand";
import { create as __create } from "@repositories/item/itemRepository";
import { findById as _findById } from "@repositories/user/userRepository";
import { findById as __findById } from "@repositories/dish/dishRepository";

const findAll = async () => {
  const demands = await _findAll({ include: ["itens"] });
  return demands;
};

const findByUser = async (userId) => {
  const demands = await findOne({ where: { userId: userId } });
  return demands;
};

const findById = async (id) => {
  const demand = await findByPk(id);
  return demand;
};

const addItem = async (itens, demand) => {
  itens.forEach(async (element) => {
    const item = await __create(element);
    await demand.addItens(item);

    const dish = await __findById(element.dish.id);
    await dish.addItens(item);
  });
};

const addClient = async (userId, demand) => {
  const user = await _findById(userId);
  await user.addDemands(demand);
};

const create = async (demand) => {
  const { itens, ..._demand } = demand;
  const _demand_ = await _create(_demand);
  await addClient(demand.user.id, _demand_);
  await addItem(itens, _demand_);
  return _demand_;
};

const remove = async (id) => {
  const demand = await findById(id);
  await demand.destroy();
};

export default {
  create,
  remove,
  findAll,
  findByUser,
  findById,
};
