const dishRepository = require("../repositories/dish/dishRepository");
const { OBJETO_UNDEFINED } = require("../../utils/messagesErro");

const create = async (dish) => {
  if (Object.values(dish).length == 0) return { message: OBJETO_UNDEFINED };
  return await dishRepository.create(dish);
};

const remove = async (id) => {
  await dishRepository.remove(id);
};

const update = async (id, dish) => {
  if (Object.values(dish).length == 0) return { message: OBJETO_UNDEFINED };
  await dishRepository.update(id, dish);
};

const findAll = async () => {
  const dishes = await dishRepository.findAll();
  return dishes ? dishes : [];
};

const findById = async (id) => {
  const dish = await dishRepository.findById(id);
  return dish ? dish : [];
};

module.exports = {
  create,
  remove,
  update,
  findAll,
  findById,
};
