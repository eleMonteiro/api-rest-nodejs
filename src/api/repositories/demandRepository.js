import Demand from "../models/demand.js";
import { create as __create } from "./itemRepository.js";
import { findById as _findById } from "./userRepository.js";
import { findById as __findById } from "./dishRepository.js";

export const findAll = async () => {
  const demands = await Demand.findAll({
    include: ["itens"],
    where: { active: true },
  });
  return demands;
};

export const findByUser = async (userId) => {
  const demands = await Demand.findOne({
    where: { userId: userId, active: true },
  });
  return demands;
};

export const findById = async (id) => {
  const demand = await Demand.findByPk(id);
  return demand;
};

export const addItem = async (itens, demand) => {
  for (const element of itens) {
    const item = await __create({ ...element, demandId: demand.id });
    await demand.addItens(item);

    const dish = await __findById(element.dishId);
    await dish.addItens(item);
  }
};

export const addClient = async (userId, demand) => {
  const user = await _findById(userId);
  await user.addDemands(demand);
};

export const create = async (demand) => {
  const { items, ..._demand } = demand;
  const _demand_ = await Demand.create({ active: true, ..._demand });
  await addClient(_demand.userId, _demand_);
  await addItem(items, _demand_);
  return _demand_;
};

export const remove = async (id) => {
  const demand = await findById(id);
  await demand.update({ active: false });
};

export const update = async (id, demand) => {
  const _demand = await findById(id);
  await _demand.update({ ...demand });
  return _demand;
};
