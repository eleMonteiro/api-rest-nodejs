import Item from "../models/item.js";

export const findAll = async () => {
  const itens = await Item.findAll({
    include: ["dishes"],
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
  const _item = await Item.create({ ...item, active: true });
  return _item;
};

export const remove = async (id) => {
  const item = await findById(id);
  await item.update({ active: false });
};
