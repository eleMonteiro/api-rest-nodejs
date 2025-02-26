const Dish = require("@models/dish");

const create = async (dish) => {
  const _dish = await Dish.create(dish);
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
  const dishes = await Dish.findAll();
  return dishes;
};

const findById = async (id) => {
  const user = await Dish.findByPk(id);
  return user;
};

module.exports = {
  create,
  remove,
  update,
  findAll,
  findById,
};
