const dishRepository = require("@repositories/dish/dishRepository");
const { createValidationError } = require("@utils/erros");

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const create = async (dish) => {
  if (isEmptyObject(dish)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  return await dishRepository.create(dish);
};

const remove = async (id) => {
  await dishRepository.remove(id);
};

const update = async (id, dish) => {
  if (isEmptyObject(dish)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
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
