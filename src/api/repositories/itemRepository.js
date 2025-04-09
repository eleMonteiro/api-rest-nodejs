import Item from "../models/item.js";
import {
  findById as findByIdDemand,
  update as updateDemand,
} from "./demandRepository.js";

export const findAll = async () => {
  const itens = await Item.findAll({
    where: { active: true },
  });
  return itens;
};

export const findByDemand = async (demandId) => {
  const item = await Item.findOne({
    where: { demandId: demandId, active: true },
  });
  return item;
};

export const findById = async (id) => {
  const item = await Item.findByPk(id);
  return item;
};

export const create = async (item) => {
  const _item = await Item.create({ active: true, ...item });
  const demand = await findByIdDemand(item.demandId);
  demand.total = demand.total + item.price;
  await updateDemand(demand.id, demand);
  return _item;
};

export const remove = async (id) => {
  const item = await findById(id);
  await item.update({ active: false });
  const demand = await findByIdDemand(item.demandId);
  demand.total = demand.total + item.price;
  await updateDemand(demand.id, demand);
};
