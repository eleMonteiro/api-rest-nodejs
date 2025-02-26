const itemRepository = require("../repositories/item/itemRepository");
const { createValidationError } = require("../../utils/erros");

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const create = async (item) => {
  if (isEmptyObject(item)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  return await itemRepository.create(item);
};

const remove = async (id) => {
  await itemRepository.remove(id);
};

const findAll = async () => {
  const itens = await itemRepository.findAll();
  return itens ? itens : [];
};

const findByDemand = async (demandId) => {
  const itens = itemRepository.findByDemand(demandId);
  return itens ? itens : [];
};

const findById = async (id) => {
  const item = await itemRepository.findById(id);
  return item ? item : [];
};

module.exports = {
  create,
  remove,
  findAll,
  findByDemand,
  findById,
};
