import Dish from "../models/dish.js";

export const create = async (dish) => {
  const _dish = await Dish.create({ ...dish, active: true });
  return _dish;
};

export const remove = async (id) => {
  const dish = await findById(id);
  await dish.update({ active: false });
};

export const update = async (id, dish) => {
  const _dish = await findById(id);
  await _dish.update({ ...dish, active: true });
};

export const findAll = async () => {
  const dishes = await Dish.findAll({
    where: { active: true },
  });
  return dishes;
};

export const findById = async (id) => {
  const user = await Dish.findByPk(id);
  return user;
};
