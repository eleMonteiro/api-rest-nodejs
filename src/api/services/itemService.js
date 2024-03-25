const itemRepository = require("../repositories/item/itemRepository");
const { OBJECT_UNDEFINED } = require("../../utils/messagesErro");

const create = async (item) => {
  if (Object.values(item).length == 0) return { message: OBJECT_UNDEFINED };
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
