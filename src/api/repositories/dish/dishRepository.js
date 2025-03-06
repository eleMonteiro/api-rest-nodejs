import { create as _create, findAll as _findAll, findByPk } from "@models/dish";

const create = async (dish) => {
  const _dish = await _create(dish);
  return _dish;
};

const remove = async (id) => {
  const dish = await findById(id);
  await dish.destroy();
};

const update = async (id, dish) => {
  const _dish = await findById(id);
  await _dish.update({ ...dish });
};

const findAll = async () => {
  const dishes = await _findAll();
  return dishes;
};

const findById = async (id) => {
  const user = await findByPk(id);
  return user;
};

export default {
  create,
  remove,
  update,
  findAll,
  findById,
};
